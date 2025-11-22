import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Challenge = () => {
    const { id } = useParams();
    const levelId = parseInt(id, 10);
    const { submitFlag, level } = useGame();
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [shake, setShake] = useState(false);

    // Level 1: Console Log
    useEffect(() => {
        if (levelId === 1) {
            console.warn('SYSTEM WARNING: Unauthorized access detected.');
            console.log('DEBUG: Auth token leaked in logs: FLAG{CONSOLE_LOGS_REVEAL_SECRETS}');
        }
    }, [levelId]);

    // Level 2: Cookies & LocalStorage
    useEffect(() => {
        if (levelId === 2) {
            document.cookie = "auth_part_1=FLAG{COOKIES_ARE_DELICIOUS";
            localStorage.setItem('auth_part_2', '_BUT_PUBLIC}');
        }
    }, [levelId]);

    // Level 3: Network Request (Simulated)
    const triggerNetworkRequest = async () => {
        if (levelId === 3) {
            // We can't easily inspect real network tab for a static file without backend,
            // but we can simulate it by making a fetch to a file that contains the flag
            // OR we can just rely on a custom header check if we had a backend.
            // For a static site, we'll fetch a dummy JSON and put the flag in a custom header of the RESPONSE?
            // We can't control response headers easily on static hosting without config.
            // ALTERNATIVE: We make a fetch request with a specific body, and the user has to find the flag in the REQUEST payload shown in network tab?
            // Let's do that. We'll send a "heartbeat" every few seconds.

            fetch('/api/heartbeat', {
                method: 'POST',
                headers: {
                    'X-Secret-Flag': 'FLAG{HEADERS_CAN_BE_MANIPULATED}',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'alive', timestamp: Date.now() })
            }).catch(() => { }); // It will 404, but show up in network tab
        }
    };

    // Sound Effects using Web Audio API
    const playSound = (frequency, duration, type = 'success') => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'square'; // Retro sound

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };

    const playSuccessSound = () => {
        playSound(523.25, 0.1); // C5
        setTimeout(() => playSound(659.25, 0.1), 100); // E5
        setTimeout(() => playSound(783.99, 0.2), 200); // G5
    };

    const playErrorSound = () => {
        playSound(200, 0.1);
        setTimeout(() => playSound(150, 0.2), 100);
    };

    useEffect(() => {
        if (levelId === 3) {
            const interval = setInterval(triggerNetworkRequest, 5000);
            triggerNetworkRequest();
            return () => clearInterval(interval);
        }
    }, [levelId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = submitFlag(input);
        if (result.success) {
            setMessage(result.message);
            playSuccessSound();
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } else {
            setMessage(result.message);
            playErrorSound();
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    const renderContent = () => {
        switch (levelId) {
            case 1:
                return <p>The developers left some debug information behind. Check the developer console.</p>;
            case 2:
                return <p>Authentication tokens are often stored on the client. Check your storage (Cookies & LocalStorage).</p>;
            case 3:
                return <p>We are intercepting a periodic heartbeat signal. Analyze the network traffic headers.</p>;
            case 4:
                return (
                    <div>
                        <p>We recovered this encrypted file:</p>
                        <div style={{ background: '#001100', padding: '1rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {'SYNT{PNRFNE_FNYNQ_VF_ORFG_FREIRQ_PBYQ}'}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-dim)' }}>HINT: ROT13</p>
                    </div>
                );
            case 5:
                return <p>Search engines are told not to look here. Check the `robots.txt` file (simulated: check /robots.txt).</p>;
            case 6:
                return (
                    <div>
                        <p>This image contains hidden data.</p>
                        <img src="/assets/hidden/suspect.png" alt="Suspicious" style={{ maxWidth: '100%', border: '1px solid var(--color-text)' }} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-dim)' }}>HINT: It's not in the pixels, but in the file itself.</p>
                    </div>
                );
            default:
                return <p>Unknown Level</p>;
        }
    };

    return (
        <div className={shake ? 'shake' : ''}>
            <h2>LEVEL {levelId} ACCESS</h2>
            <div style={{ margin: '2rem 0', border: '1px dashed var(--color-dim)', padding: '2rem' }}>
                {renderContent()}
            </div>

            <form onSubmit={handleSubmit}>
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
                        marginBottom: '1rem'
                    }}
                />
                <button type="submit">SUBMIT</button>
            </form>
            {message && <div style={{ marginTop: '1rem', color: message.includes('DENIED') ? 'var(--color-alert)' : 'var(--color-text)' }}>{message}</div>}

            <div style={{ marginTop: '2rem' }}>
                <button onClick={() => navigate('/dashboard')}>BACK TO DASHBOARD</button>
            </div>

            <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
        </div>
    );
};

export default Challenge;
