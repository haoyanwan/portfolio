import { useState, useEffect, useMemo } from "react";
import styles from "./Hero.module.css";
import { getScrollConfig } from "../../utils/scrollConfig"; // Import the config

const Hero = ({ virtualScrollY, actualScrollY, currentBreakpoint }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  const textOptions = useMemo(
    () => [
      "Haoyan Wan",
      "10X Developer",
      "Haoyan Wan",
      "Vim Master",
      "Haoyan Wan",
      "Merge Conflict Solver",
    ],
    []
  );

  const description = "Hey there my name is Haoyan Wan. I'm A Full Stack Developer. Check out my work, I make them with skill and love.";

  // Get window height and scroll config
  const windowHeight = window.innerHeight;
  const scrollConfig = useMemo(() => getScrollConfig(windowHeight), [windowHeight]);

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

  // Calculate the transform offset using scrollConfig
  const scrollProgress = Math.min(
    Math.max(virtualScrollY / scrollConfig.breakpoints[0].virtualRange[1], 0),
    1
  );

  const primaryTransform = `translateY(${scrollProgress * -100 + 10}vh)`;
  const secondaryTransform = `translateY(${Math.max((0.5 - scrollProgress) * 100, -10)}vh)`;
  const primaryOpacity = 1 - scrollProgress * 4;
  const secondaryOpacity = Math.min(scrollProgress * 2, 2 - scrollProgress * 2);

  return (
    <>
      <div
        className={styles.textContainer}
        style={{ transform: primaryTransform, opacity: primaryOpacity }}
      >
        <div className={styles.name}>
          {displayText}
          <span className={styles.cursor}>|</span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div
        className={styles.textContainer}
        style={{ transform: secondaryTransform, opacity: secondaryOpacity }}
      >
        <h1>This Website is made with Zero Libraries, Keeping It Simple</h1>
        <p className={styles.description}>except a little bit of react ...</p>
      </div>
    </>
  );
};

export default Hero;