import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { useMemo } from 'react';

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isErasing, setIsErasing] = useState(false);
    
    const textOptions = useMemo(() => [
        'Haoyan Wan',
        '10X Developer',
        'Vim Master',
        'Merge Conflict Solver'
    ], []);

    const description = 'Hey there I\'m A Full Stack Developer. Check out my work, I make them with LOVE.';

    useEffect(() => {
        let timeout;

        const currentText = textOptions[currentIndex];

        if (!isErasing) {
            // Typing phase
            if (displayText.length < currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                }, 150);
            } else {
                // Finished typing, wait 2 seconds then start erasing
                timeout = setTimeout(() => {
                    setIsErasing(true);
                }, 2000);
            }
        } else {
            // Erasing phase
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 50);
            } else {
                // Finished erasing, move to next text
                setIsErasing(false);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isErasing, textOptions]);

    return (
        <>
            <h1 className={styles.name}>
                {displayText}
                <span className={styles.cursor}>|</span>
            </h1>

            <p className={styles.description}>
                {description}
            </p>
        </>
    );
};

export default Hero;