import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      border: '1px solid #0f0',
      padding: '10px',
      backgroundColor: '#000',
      fontFamily: 'monospace',
      zIndex: 1000
    }}>
      <div style={{ fontSize: '0.8rem', marginBottom: '5px', color: '#0f0' }}>
        [AUDIO_MODULE]
      </div>
      <audio
        ref={audioRef}
        src="/music/bgm.mp3"
        loop
      />
      <button 
        onClick={togglePlay}
        style={{
          background: 'transparent',
          border: '1px solid #0f0',
          color: '#0f0',
          cursor: 'pointer',
          padding: '5px 10px',
          fontFamily: 'monospace'
        }}
      >
        {isPlaying ? 'STOP_STREAM' : 'INIT_STREAM'}
      </button>
    </div>
  );
};

export default MusicPlayer;
