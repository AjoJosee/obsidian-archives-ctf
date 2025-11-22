import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <h1 style={{ fontSize: '4rem', color: 'var(--color-alert)' }}>404</h1>
            <p>DATA FRAGMENT MISSING</p>
            <Link to="/">RETURN TO SOURCE</Link>
        </div>
    );
};

export default NotFound;
