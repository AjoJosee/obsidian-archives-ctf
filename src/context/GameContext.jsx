import React, { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('obsidian_level');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem('obsidian_flags');
    return saved ? JSON.parse(saved) : [];
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('obsidian_level', level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem('obsidian_flags', JSON.stringify(flags));
  }, [flags]);

  const submitFlag = (flag) => {
    // In a real CTF, this would verify against a backend hash
    // For this static site, we'll check against hardcoded values (obfuscated later)
    const validFlags = [
      'FLAG{HTML_COMMENTS_ARE_NOT_SECURE}', // Level 0
      'FLAG{CONSOLE_LOGS_REVEAL_SECRETS}', // Level 1
      'FLAG{COOKIES_ARE_DELICIOUS_BUT_PUBLIC}', // Level 2
      'FLAG{HEADERS_CAN_BE_MANIPULATED}', // Level 3
      'FLAG{CAESAR_SALAD_IS_BEST_SERVED_COLD}', // Level 4
      'FLAG{ROBOTS_CANT_KEEP_SECRETS}', // Level 5
      'FLAG{A_PICTURE_IS_WORTH_A_THOUSAND_WORDS}' // Level 6
    ];

    if (validFlags[level] === flag) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setFlags([...flags, flag]);
      return { success: true, message: 'ACCESS GRANTED. SYSTEM UPGRADED.' };
    }
    return { success: false, message: 'ACCESS DENIED. INVALID CREDENTIALS.' };
  };

  const resetGame = () => {
    setLevel(0);
    setFlags([]);
    localStorage.removeItem('obsidian_level');
    localStorage.removeItem('obsidian_flags');
  };

  return (
    <GameContext.Provider value={{ level, flags, submitFlag, resetGame, isTerminalOpen, setIsTerminalOpen }}>
      {children}
    </GameContext.Provider>
  );
};
