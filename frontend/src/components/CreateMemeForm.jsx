import React, { useState } from 'react';
import axios from 'axios';

export default function CreateMemeForm() {
    const [form, setForm] = useState({
        title: '',
        image_url: '',
        tags: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tagsArray = form.tags.split(',').map(tag => tag.trim());

        await axios.post('http://localhost:5000/memes', {
            ...form,
            tags: tagsArray,
            image_url: form.image_url || 'https://picsum.photos/300'
        });
    };

    return (
        <div className="mb-8 p-4 border border-cyberPurple rounded-lg">
            <h2 className="neon-text text-xl mb-4">CREATE MEME</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="bg-black text-cyberBlue border border-cyberPink p-2 w-full mb-2"
                    placeholder="Meme title"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                />
                <input
                    className="bg-black text-cyberBlue border border-cyberPink p-2 w-full mb-2"
                    placeholder="Image URL (optional)"
                    value={form.image_url}
                    onChange={(e) => setForm({...form, image_url: e.target.value})}
                />
                <input
                    className="bg-black text-cyberBlue border border-cyberPink p-2 w-full mb-4"
                    placeholder="Tags (comma separated)"
                    value={form.tags}
                    onChange={(e) => setForm({...form, tags: e.target.value})}
                />
                <button
                    type="submit"
                    className="glitch-hover bg-cyberPink text-black font-bold py-2 px-4 w-full"
                >
                    GENERATE MEME
                </button>
            </form>
        </div>
    );
}