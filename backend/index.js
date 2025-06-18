const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const supabase = require('./supabase');
const { generateCaption } = require('./gemini');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());

// In-memory cache
let leaderboardCache = [];

// Meme endpoints
app.post('/memes', async (req, res) => {
    const { title, image_url, tags } = req.body;

    const caption = await generateCaption(tags);
    const vibe = "Neon Crypto Chaos"; // Simplified for demo

    const { data, error } = await supabase
        .from('memes')
        .insert([{ title, image_url, tags, caption, vibe }]);

    if (error) return res.status(500).json({ error });

    io.emit('new_meme', data[0]);
    res.status(201).json(data[0]);
});

// Real-time Socket.IO
io.on('connection', (socket) => {
    socket.on('place_bid', async (bidData) => {
        const { data } = await supabase.from('bids').insert([bidData]);
        io.emit('bid_update', bidData);
    });

    socket.on('vote', async ({ memeId, type }) => {
        const { data } = await supabase.rpc(type === 'up' ? 'increment_upvote' : 'decrement_upvote', {
            meme_id: memeId
        });
        io.emit('vote_update', { memeId, upvotes: data[0].upvotes });
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});