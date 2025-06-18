import React, { useState } from 'react';
import socket from '../socket';

export default function MemeCard({ meme }) {
    const [bidAmount, setBidAmount] = useState(50);
    const [showTerminal, setShowTerminal] = useState(false);

    const placeBid = () => {
        socket.emit('place_bid', {
            meme_id: meme.id,
            user_id: 'cyberpunk420',
            credits: bidAmount
        });
    };

    const handleVote = (type) => {
        socket.emit('vote', { memeId: meme.id, type });
    };

    return (
        <div className="border border-cyberBlue rounded-lg overflow-hidden bg-black bg-opacity-50 mb-4">
            <div className="p-4">
                <h3 className="text-xl neon-text">{meme.title}</h3>
                <p className="text-cyberPink">{meme.caption}</p>

                <div className="my-3">
                    <img
                        src={meme.image_url}
                        alt={meme.title}
                        className="w-full h-48 object-cover border border-cyberPurple"
                        onMouseEnter={() => setShowTerminal(true)}
                        onMouseLeave={() => setShowTerminal(false)}
                    />
                    {showTerminal && (
                        <div className="absolute bg-black border border-cyberGreen p-2 text-xs">
                            VIBE_ANALYSIS: {meme.vibe}
                        </div>
                    )}
                </div>

                <div className="flex justify-between mb-3">
                    <button
                        onClick={() => handleVote('up')}
                        className="bg-cyberGreen text-black px-3 py-1"
                    >
                        UPVOTE ({meme.upvotes})
                    </button>
                    <button
                        onClick={() => handleVote('down')}
                        className="bg-cyberPink text-black px-3 py-1"
                    >
                        DOWNVOTE
                    </button>
                </div>

                <div className="flex">
                    <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="bg-black text-cyberBlue border border-cyberPink p-2 w-3/4"
                    />
                    <button
                        onClick={placeBid}
                        className="bg-cyberBlue text-black font-bold w-1/4"
                    >
                        BID
                    </button>
                </div>
            </div>
        </div>
    );
}