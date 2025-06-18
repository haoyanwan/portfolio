import React from 'react';

const Navigation = ({ onNavigate, windowHeight }) => {
    return (
        <nav className="navigation">
            <div className="nav-brand">HAOYAN PORTFOLIO</div>

            <div className="nav-links">
                <button className="nav-link" onClick={() => onNavigate(0)}>
                    Home
                </button>
                <button
                    className="nav-link"
                    onClick={() => onNavigate(windowHeight * 0.75)}
                >
                    Work
                </button>
                <button
                    className="nav-link"
                    onClick={() => onNavigate(windowHeight * 1.5)}
                >
                    About
                </button>
                <button
                    className="nav-link"
                    onClick={() => onNavigate(windowHeight * 2.5)}
                >
                    Contact
                </button>
            </div>
        </nav>
    );
};

export default Navigation;