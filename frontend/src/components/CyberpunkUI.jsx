import React, { useEffect, useState } from 'react';

export default function CyberpunkUI() {
    const [typedText, setTypedText] = useState('');
    const fullText = "MEMEHUSTLE//CYBERPUNK_MARKET_V2.3.5";

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            setTypedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(typing);
        }, 100);
        return () => clearInterval(typing);
    }, []);

    return (
        <div className="border-2 border-cyberPink p-4 mb-6">
            <div className="terminal-typing neon-text text-xl font-mono">
                {typedText}
            </div>
            <div className="h-1 bg-gradient-to-r from-cyberPink to-cyberBlue mt-2"></div>
        </div>
    );
}