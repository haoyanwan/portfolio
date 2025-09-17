import styles from "./CardTrack.module.css";
import { useState, useMemo } from "react";
import { getScrollConfig } from "../../utils/scrollConfig";

const cardData = [
  {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "https://hitems.ai/",
    title: "HItems.AI",
    description: "AI startup for generating customized fashion accessories using artificial intelligence"
  },
  {
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "https://github.com/cse110-sp25-group15/cse110-sp25-group15",
    title: "College Marketplace",
    description: "Web application for college marketplace facilitating student commerce and exchanges"
  },
  {
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "/Fine-Tuning Pretrained Transformers.pdf",
    title: "Transformer Research",
    description: "Research paper on fine-tuning pretrained transformers for improved model performance"
  },
  {
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://hzics.com/",
    title: "HZICS",
    description: "Landing website for small business conducting in conference management systems in Guangzhou, China"
  },
  {
    image: "https://images.unsplash.com/photo-1749456289357-4e5cbffe9fb3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "#",
    title: "Project 5",
    description: "Coming soon"
  },
  {
    image: "https://images.unsplash.com/photo-1749248120469-c41bf8471a48?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "#",
    title: "Project 6",
    description: "Coming soon"
  },
  {
    image: "https://images.unsplash.com/photo-1734607947797-2a61b996fd5d?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "#",
    title: "Project 7",
    description: "Coming soon"
  },
];

const CardTrack = (prop) => {
  const [selectedCard, setSelectedCard] = useState(cardData[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollY = prop.virtualScrollY;
  const windowHeight = window.innerHeight;

  // Get scroll config
  const scrollConfig = useMemo(() => getScrollConfig(windowHeight), [windowHeight]);

  // Get the card scroll phase breakpoint from config
  const cardScrollBreakpoint = scrollConfig.breakpoints.find(
    bp => bp.name === "card-scroll-phase"
  );

  // Use the breakpoint's virtual range
  const [scrollRangeStart, scrollRangeEnd] = cardScrollBreakpoint.virtualRange;

  const adjustedScrollStart = scrollRangeStart - (windowHeight * 0.2);

  const scrollPercent = (() => {
    if (scrollY < scrollRangeStart) return 0;
    if (scrollY > scrollRangeEnd) return 85;
    return (
      ((scrollY - scrollRangeStart) / (scrollRangeEnd - scrollRangeStart)) * 85
    );
  })();

  const adjustedPercent = (() => {
    if (scrollPercent < 0) return 0;
    if (scrollPercent > 85) return 85;
    return (
      (scrollY - adjustedScrollStart) / (scrollRangeEnd - adjustedScrollStart) * 85
    );
  })();

  const zoomedObjectPosition = `${Math.min(scrollPercent, 100)}%`;
  const trackScrollPosition = scrollPercent >= 42.5
    ? `-${scrollPercent - 42.5}%`
    : `${42.5 - scrollPercent}%`;
  const displayVisible = scrollY >= scrollRangeStart && scrollY <= scrollRangeEnd
    ? "translateY(0%)"
    : "translateY(5vh)";

  return (
    <>
      <div className={styles.title}>My Work</div>
      <div
        className={styles.image_track}
        style={{ transform: `translateX(${trackScrollPosition})` }}
      >
        {cardData.map((card, index) => (
          <img
            key={index}
            className={`${styles.image_track_item} ${selectedIndex === index ? styles.selected : ''}`}
            style={{ objectPosition: zoomedObjectPosition, cursor: 'pointer' }}
            src={card.image}
            alt={card.title}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onMouseEnter={() => {
              setSelectedCard(card);
              setSelectedIndex(index);
            }}
            onClick={() => {
              if (card.link && card.link !== '#') {
                window.open(card.link, '_blank');
              }
            }}
          />
        ))}
      </div>
      <div
        className={styles.cardCounter}
        style={{
          transform: displayVisible,
          opacity: adjustedPercent > 0 && adjustedPercent < 85 ? 1 : 0
        }}
      >
        <div className={styles.cardTitle}>{selectedCard.title}</div>
        <div className={styles.cardDescription}>{selectedCard.description}</div>
      </div>
    </>
  );
};

export default CardTrack;