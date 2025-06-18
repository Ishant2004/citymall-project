import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from './socket';
import CyberpunkUI from './components/CyberpunkUI';
import CreateMemeForm from './components/CreateMemeForm';
import MemeCard from './components/MemeCard';
import Leaderboard from './components/Leaderboard';

export default function App() {
    const [memes, setMemes] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // Fetch initial data
        axios.get('http://localhost:5000/memes').then(res => setMemes(res.data));
        axios.get('http://localhost:5000/leaderboard?top=10').then(res => setLeaderboard(res.data));

        // Socket listeners
        socket.on('new_meme', newMeme => {
            setMemes(prev => [newMeme, ...prev]);
        });

        socket.on('vote_update', ({ memeId, upvotes }) => {
            setMemes(prev => prev.map(m => m.id === memeId ? {...m, upvotes} : m));
        });

        return () => {
            socket.off('new_meme');
            socket.off('vote_update');
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <CyberpunkUI />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CreateMemeForm />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {memes.map(meme => (
                            <MemeCard key={meme.id} meme={meme} />
                        ))}
                    </div>
                </div>

                <div>
                    <Leaderboard data={leaderboard} />
                </div>
            </div>
        </div>
    );
}