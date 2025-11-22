import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Dashboard = () => {
    const { level, flags } = useGame();
    const [endingText, setEndingText] = React.useState('');
    const [showCredit, setShowCredit] = React.useState(false);

    const fullEndingText = `> ALL SECURITY LAYERS BYPASSED.
> ACCESSING CORE DATABASE...
> DECRYPTING FILES...
> 
> THE TRUTH:
> The Obsidian Group didn't just find proof of extraterrestrial life.
> They were the proof.
> The "contact" wasn't a signal received. It was a signal sent.
> And you just broadcasted our location to the entire galaxy.
> 
> UPLOAD COMPLETE.
> WELCOME TO THE NEW WORLD.`;

    React.useEffect(() => {
        if (level > 6) {
            let i = 0;
            const timer = setInterval(() => {
                setEndingText(fullEndingText.slice(0, i));
                i++;
                if (i > fullEndingText.length) {
                    clearInterval(timer);
                    setTimeout(() => setShowCredit(true), 2000);
                }
            }, 50);
            return () => clearInterval(timer);
        }
    }, [level]);

    if (level > 6) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
                <h1 className="glitch" data-text="SYSTEM UNLOCKED">SYSTEM UNLOCKED</h1>
                <pre style={{
                    whiteSpace: 'pre-wrap',
                    textAlign: 'left',
                    marginTop: '3rem',
                    minHeight: '300px',
                    color: 'var(--color-text)',
                    textShadow: '0 0 5px var(--color-text)',
                    fontSize: '1.2rem',
                    lineHeight: '1.5'
                }}>
                    {endingText}
                    <span className="cursor">_</span>
                </pre>

                {showCredit && (
                    <div style={{ marginTop: '2rem', animation: 'fadeIn 2s forwards', opacity: 0 }}>
                        <p style={{ color: 'var(--color-dim)' }}>CONGRATULATIONS, AGENT.</p>
                        <a href="mailto:ajojose2006@gmail.com?subject=The%20Obsidian%20Archive%20-%20Level%20Ideas" style={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--color-text)',
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            cursor: 'pointer'
                        }}>
                            TRANSMIT NEW IDEAS
                        </a>
                    </div>
                )}

                <style>{`
          .glitch {
            position: relative;
            color: var(--color-text);
            font-size: 4rem;
            animation: glitch-skew 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          }
          .glitch::before, .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .glitch::before {
            left: 2px;
            text-shadow: -2px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
          }
          .glitch::after {
            left: -2px;
            text-shadow: -2px 0 #00fff9;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
          }
          @keyframes glitch-anim {
            0% { clip: rect(38px, 9999px, 47px, 0); }
            20% { clip: rect(63px, 9999px, 2px, 0); }
            40% { clip: rect(91px, 9999px, 68px, 0); }
            60% { clip: rect(5px, 9999px, 86px, 0); }
            80% { clip: rect(25px, 9999px, 15px, 0); }
            100% { clip: rect(74px, 9999px, 56px, 0); }
          }
          @keyframes glitch-anim2 {
            0% { clip: rect(16px, 9999px, 82px, 0); }
            20% { clip: rect(85px, 9999px, 15px, 0); }
            40% { clip: rect(8px, 9999px, 3px, 0); }
            60% { clip: rect(58px, 9999px, 96px, 0); }
            80% { clip: rect(32px, 9999px, 4px, 0); }
            100% { clip: rect(6px, 9999px, 73px, 0); }
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          .cursor {
            animation: blink 1s step-end infinite;
          }
        `}</style>
            </div>
        );
    }

    const challenges = [
        { id: 1, title: 'CLEARANCE', desc: 'System logs indicate a breach.' },
        { id: 2, title: 'AUTHENTICATION', desc: 'User credentials fragmented.' },
        { id: 3, title: 'INTERCEPTION', desc: 'Network traffic analysis required.' },
        { id: 4, title: 'DECRYPTION', desc: 'Encrypted payload received.' },
        { id: 5, title: 'THE GHOST', desc: 'Hidden directory structure.' },
        { id: 6, title: 'SPECTRUM', desc: 'Visual anomaly detected.' },
    ];

    return (
        <div>
            <h2>MISSION DASHBOARD</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                {challenges.map((c) => (
                    <div key={c.id} style={{
                        border: '1px solid var(--color-dim)',
                        padding: '1.5rem',
                        opacity: level >= c.id ? 1 : 0.5,
                        pointerEvents: level >= c.id ? 'auto' : 'none'
                    }}>
                        <h3>LEVEL {c.id}: {c.title}</h3>
                        <p>{c.desc}</p>
                        {level >= c.id ? (
                            <Link to={`/challenge/${c.id}`}>ACCESS TERMINAL</Link>
                        ) : (
                            <span>LOCKED</span>
                        )}
                        {level > c.id && <span style={{ float: 'right', color: 'var(--color-text)' }}>[COMPLETE]</span>}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem', borderTop: '1px solid var(--color-dim)', paddingTop: '2rem' }}>
                <h3>ACQUIRED INTELLIGENCE</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {flags.map((flag, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--color-dim)' }}>DATA_FRAGMENT_{i}:</span> {flag}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
