const Navigation = ({ onNavigate, windowHeight, tab, scrollConfig }) => {
    // Extract navigation positions from the existing scrollConfig structure
    const getNavPosition = (index) => {
        if (!scrollConfig?.breakpoints?.[index]) return windowHeight * [0, 0.75, 2.5, 3.5][index];
        return scrollConfig.breakpoints[index].virtualRange[0];
    };

    return (
        <nav className="navigation">
            <div className="nav-brand">HAOYAN PORTFOLIO</div>

            <div className="nav-links">
                <button
                    className={`nav-link ${tab === 'Home' ? 'active' : ''}`}
                    onClick={() => onNavigate(getNavPosition(0))}
                >
                    Home
                </button>
                <button
                    className={`nav-link ${tab === 'Work' ? 'active' : ''}`}
                    onClick={() => onNavigate(getNavPosition(1) + windowHeight * 0.5)}
                >
                    Work
                </button>
                <button
                    className={`nav-link ${tab === 'About' ? 'active' : ''}`}
                    onClick={() => onNavigate(getNavPosition(2) + windowHeight * 0.5)}
                >
                    About
                </button>
                <button
                    className={`nav-link ${tab === 'Contact' ? 'active' : ''}`}
                    onClick={() => onNavigate(getNavPosition(3) + windowHeight * 0.5)}
                >
                    Contact
                </button>
            </div>
        </nav>
    );
};

export default Navigation;