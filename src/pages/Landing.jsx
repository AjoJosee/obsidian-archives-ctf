import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Landing = () => {
    const [input, setInput] = useState(''); // Keep existing input state
    const [text, setText] = useState('');
    const { submitFlag, level } = useGame();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const fullText = `> CONNECTING TO OBSIDIAN SECURE TERMINAL...
> CONNECTION ESTABLISHED.
> WARNING: SYSTEM INTEGRITY COMPROMISED.
> 
> THE NARRATIVE:
> You have stumbled upon a legacy terminal used by "The Obsidian Group", 
> a shadow organization dismantled in the late 90s.
> Rumor has it their core database contains proof of extraterrestrial contact.
> The system is partially corrupted and locked down.
> 
> MISSION:
> Bypass the security layers to access the "Core Truth".
> 
> ENTER AUTHORIZATION CODE TO PROCEED...`;

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 30);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = submitFlag(input);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <pre style={{
                whiteSpace: 'pre-wrap',
                textAlign: 'left',
                marginBottom: '2rem',
                minHeight: '300px',
                color: 'var(--color-text)',
                textShadow: '0 0 5px var(--color-text)'
            }}>
                {text}
                <span className="cursor">_</span>
            </pre>

            {/* 
        HINT: The architects were lazy. They left the key under the mat.
        FLAG{HTML_COMMENTS_ARE_NOT_SECURE}
      */}

            <form onSubmit={handleSubmit} style={{ opacity: text.length === fullText.length ? 1 : 0, transition: 'opacity 1s' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ENTER FLAG"
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--color-text)',
                        color: 'var(--color-text)',
                        padding: '1rem',
                        fontSize: '1.2rem',
                        width: '100%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono)'
                    }}
                />
                <br />
                <button type="submit" style={{ marginTop: '1rem' }}>AUTHENTICATE</button>
            </form>

            {error && <div style={{ color: 'var(--color-alert)', marginTop: '1rem' }}>{error}</div>}

            {level > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <button onClick={() => navigate('/dashboard')}>RETURN TO DASHBOARD</button>
                </div>
            )}

            <style>{`
        .cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default Landing;
