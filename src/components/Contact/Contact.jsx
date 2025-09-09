import { useMemo } from "react";
import styles from "./Contact.module.css";
import { getScrollConfig } from "../../utils/scrollConfig";

const Contact = ({ virtualScrollY, actualScrollY, currentBreakpoint }) => {
  const windowHeight = window.innerHeight;
  const scrollConfig = useMemo(() => getScrollConfig(windowHeight), [windowHeight]);

  const contactBreakpoint = scrollConfig.breakpoints.find(
    bp => bp.name === "contact-section"
  );

  const [scrollRangeStart, scrollRangeEnd] = contactBreakpoint.virtualRange;

  // Add offset of 0.5 windowHeight to the start of the scroll range
  const adjustedScrollStart = scrollRangeStart - (windowHeight * 0.5);

  const scrollProgress = useMemo(() => {
    if (virtualScrollY < adjustedScrollStart) return 0;
    if (virtualScrollY > scrollRangeEnd) return 1;
    return (virtualScrollY - adjustedScrollStart) / (scrollRangeEnd - adjustedScrollStart);
  }, [virtualScrollY, adjustedScrollStart, scrollRangeEnd]);

  const inViewport = virtualScrollY >= adjustedScrollStart &&
    virtualScrollY <= scrollRangeEnd + windowHeight;

  // Animation transforms
  const titleTransform = `translateY(${(1 - scrollProgress) * 50}px) scale(${0.8 + scrollProgress * 0.2})`;
  const titleOpacity = Math.min(scrollProgress * 3, 1);

  const emailTransform = `translateX(${(1 - scrollProgress) * -100}px)`;
  const emailOpacity = Math.min(scrollProgress * 2 - 0.2, 1);

  const linkedinTransform = `translateX(${(1 - scrollProgress) * 100}px)`;
  const linkedinOpacity = Math.min(scrollProgress * 2 - 0.3, 1);

  const githubTransform = `translateY(${(1 - scrollProgress) * 100}px)`;
  const githubOpacity = Math.min(scrollProgress * 2 - 0.4, 1);

  const messageTransform = `translateY(${(1 - scrollProgress) * 50}px)`;
  const messageOpacity = Math.min(scrollProgress * 2 - 0.5, 1);

  if (!inViewport) return null;

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contentWrapper}>
        <h1
          className={styles.title}
          style={{
            transform: titleTransform,
            opacity: titleOpacity
          }}
        >
          Let's Connect
        </h1>

        <p
          className={styles.subtitle}
          style={{
            transform: messageTransform,
            opacity: messageOpacity
          }}
        >
          I'm ready to build something amazing.
        </p>

        <div className={styles.contactLinks}>
          <a
            href="mailto:haoyanlgd@gmail.com"
            className={styles.contactCard}
            style={{
              transform: emailTransform,
              opacity: emailOpacity
            }}
          >
            <div className={styles.cardIcon}>📧</div>
            <div className={styles.cardContent}>
              <h3>Email</h3>
              <p>haoyanlgd@gmail.com</p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/wanhaoyan/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
            style={{
              transform: linkedinTransform,
              opacity: linkedinOpacity
            }}
          >
            <div className={styles.cardIcon}>💼</div>
            <div className={styles.cardContent}>
              <h3>LinkedIn</h3>
              <p>Connect on LinkedIn</p>
            </div>
          </a>

          <a
            href="https://github.com/haoyanwan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
            style={{
              transform: githubTransform,
              opacity: githubOpacity
            }}
          >
            <div className={styles.cardIcon}>🚀</div>
            <div className={styles.cardContent}>
              <h3>GitHub</h3>
              <p>Check out my code</p>
            </div>
          </a>
        </div>

        <div
          className={styles.footer}
          style={{
            opacity: scrollProgress > 0.7 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.7 ? 0 : 20}px)`
          }}
        >
          <p>© 2025 Haoyan Wan · Built with React & Passion</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;