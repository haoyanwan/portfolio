import { useMemo } from "react";
import styles from "./About.module.css";
import { getScrollConfig } from "../../utils/scrollConfig";

const About = ({ virtualScrollY, actualScrollY, currentBreakpoint }) => {
  const windowHeight = window.innerHeight;
  const scrollConfig = useMemo(() => getScrollConfig(windowHeight), [windowHeight]);

  const aboutBreakpoint = scrollConfig.breakpoints.find(
    bp => bp.name === "about-section"
  );

  const [scrollRangeStart, scrollRangeEnd] = aboutBreakpoint.virtualRange;

  // Add offset of 0.5 windowHeight to the start of the scroll range
  const adjustedScrollStart = scrollRangeStart - (windowHeight * 0.5);

  const scrollProgress = useMemo(() => {
    if (virtualScrollY < adjustedScrollStart) return 0;
    if (virtualScrollY > scrollRangeEnd) return 1;
    return (virtualScrollY - adjustedScrollStart) / (scrollRangeEnd - adjustedScrollStart);
  }, [virtualScrollY, adjustedScrollStart, scrollRangeEnd]);

  const inViewport = virtualScrollY >= adjustedScrollStart &&
    virtualScrollY <= scrollRangeEnd + windowHeight;

  const titleTransform = `translateX(${(1 - scrollProgress) * -100}%)`;
  const titleOpacity = Math.min(scrollProgress * 3, 1);

  const contentTransform = `translateY(${(1 - scrollProgress) * 15}vh)`;
  const contentOpacity = Math.min(scrollProgress * 2 - 0.2, 1);

  const skillsTransform = `translateX(${(1 - scrollProgress) * 100}%)`;
  const skillsOpacity = Math.min(scrollProgress * 2 - 0.5, 1);

  const skills = [
    "JavaScript",
    "HTML/CSS",
    "Java",
    "Python",
    "C/C++",
    "SQL",
    "React",
    "Node.js",
    "Flask",
    "Vite",
    "jQuery",
    "Supabase",
    "FastAPI",
    "Next.js",
    "Git",
    "Docker",
    "AWS",
    "VS Code",
    "PostgreSQL",
    "pandas",
    "NumPy",
    "Matplotlib",
    "Framer-Motion",
    "Redux"
  ];

  const bio = [
    "I specialize in taking ideas from concept to full-fledged platforms. On the backend, I've built scalable services in Python, Node, and Go, with data pipelines designed for high throughput and reliability.",
    "On the frontend, I craft modern interfaces in React and Next.js, always aiming for clean design and seamless interaction. My experience includes building advanced features like workflow orchestration, DAG visualization, and interactive component canvases.",
    "I'm experienced in establishing engineering best practices through well-documented code, Architecture Decision Records (ADRs), and creating robust CI/CD pipelines that streamline development workflows."
  ];

  const experience = [
    { title: "Full Stack Developer", company: "Hitems.ai", period: "Jun 2023 - Current" },
    { title: "Software Engineering Tutor", company: "Private Tutoring", period: "Sep 2022 - May 2023" },
  ];

  const projects = [
    { 
      title: "College Marketplace App (Lead Developer)", 
      company: "Web Components, PostgreSQL, Google OAuth",
      period: "Jan 2025 - Present"
    },
    { 
      title: "QuizzicalAI", 
      company: "Next.js, OpenAI API, Vercel, Tailwind",
      period: "June 2024"
    },
    { 
      title: "Roblox Market Tracker", 
      company: "Next.js, Vercel, Recharts, PostgreSQL",
      period: "Mar 2024 - Jun 2024"
    }
  ];

  if (!inViewport) return null;

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.mainLayout}>
        <div className={styles.titleSection}>
          <h1
            className={styles.title}
            style={{
              transform: titleTransform,
              opacity: titleOpacity
            }}
          >
            <span>A</span>
            <span>b</span>
            <span>o</span>
            <span>u</span>
            <span>t</span>
            <span className={styles.spacer}> </span>
            <span>M</span>
            <span>e</span>
          </h1>
        </div>

        <div className={styles.contentSection}>
          <div
            className={styles.contentWrapper}
            style={{
              transform: contentTransform,
              opacity: contentOpacity
            }}
          >
            <div className={styles.bioSection}>
              {bio.map((paragraph, index) => (
                <p key={index} className={styles.bio}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.experienceProjectsSection}>
              <div className={styles.experienceSection}>
                <h2>Experience</h2>
                <div className={styles.experienceList}>
                  {experience.map((exp, index) => (
                    <div
                      key={index}
                      className={styles.experienceItem}
                      style={{
                        animationDelay: `${scrollProgress * 0.3 + index * 0.1}s`,
                        opacity: scrollProgress > 0.3 ? 1 : 0,
                        transform: scrollProgress > 0.3 ? 'translateX(0)' : 'translateX(-20px)'
                      }}
                    >
                      <h3>{exp.title}</h3>
                      <p className={styles.company}>{exp.company}</p>
                      <span className={styles.period}>{exp.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.projectsSection}>
                <h2>Projects</h2>
                <div className={styles.projectsList}>
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className={styles.projectItem}
                      style={{
                        animationDelay: `${scrollProgress * 0.3 + (index + experience.length) * 0.1}s`,
                        opacity: scrollProgress > 0.3 ? 1 : 0,
                        transform: scrollProgress > 0.3 ? 'translateX(0)' : 'translateX(-20px)'
                      }}
                    >
                      <h3>{project.title}</h3>
                      <p className={styles.company}>{project.company}</p>
                      <span className={styles.period}>{project.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.skillsSection}
            style={{
              transform: skillsTransform,
              opacity: skillsOpacity
            }}
          >
            <h2>Skills</h2>
            <div className={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={styles.skillBubble}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    opacity: scrollProgress > 0.4 ? 1 : 0,
                    transform: scrollProgress > 0.4 ? 'scale(1)' : 'scale(0.8)'
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.floatingElement}
        style={{
          transform: `rotate(${scrollProgress * 360}deg) scale(${0.5 + scrollProgress * 0.5})`,
          opacity: scrollProgress > 0.2 ? 0.3 : 0
        }}
      />
    </div>
  );
};

export default About;