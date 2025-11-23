import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Challenge from './pages/Challenge';
import NotFound from './pages/NotFound';
import MusicPlayer from './components/MusicPlayer';

const ProtectedRoute = ({ children }) => {
  const { level } = useGame();
  // Simple protection: if level is 0, force them to start at landing (unless it IS landing)
  // Actually, let's allow them to browse but content might be locked
  return children;
};

const Layout = ({ children }) => {
  return (
    <div className="crt">
      <MusicPlayer />
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>THE OBSIDIAN ARCHIVES</div>
          <div style={{ fontSize: '0.8rem' }}>SYS.STATUS: UNSTABLE</div>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/challenge/:id" element={<Challenge />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </GameProvider>
  );
}

export default App;
