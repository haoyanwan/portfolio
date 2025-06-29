import styles from "./CardTrack.module.css";
import { useState, useMemo } from "react";
import { getScrollConfig } from "../../utils/scrollConfig";

const images = [
  "https://images.unsplash.com/photo-1749315185949-5540f5d6549a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://plus.unsplash.com/premium_photo-1710800032613-6e528143e119?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1749390002163-0d151e3550d8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1749456289357-4e5cbffe9fb3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1749248120469-c41bf8471a48?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1734607947797-2a61b996fd5d?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1749310112178-d0e62994b0e0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0",
];

const CardTrack = (prop) => {
  const [subText, setSubText] = useState("Image 1");
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
  const buffer = windowHeight * 0; // You can adjust buffer if needed

  const scrollPercent = (() => {
    if (scrollY < scrollRangeStart + buffer) return 0;
    if (scrollY > scrollRangeEnd - buffer) return 150;
    return (
      ((scrollY - (scrollRangeStart + buffer)) / 
       ((scrollRangeEnd - buffer) - (scrollRangeStart + buffer))) * 150
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
        {images.map((src, index) => (
          <img
            key={index}
            className={`${styles.image_track_item} ${selectedIndex === index ? styles.selected : ''}`}
            style={{ objectPosition: zoomedObjectPosition }}
            src={src}
            alt={`item ${index + 1}`}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onMouseEnter={() => {
              setSubText(`Image ${index + 1}`);
              setSelectedIndex(index);
            }}
          />
        ))}
      </div>
      <div 
        className={styles.cardCounter} 
        style={{ 
          transform: displayVisible, 
          opacity: scrollPercent > 0 ? 1 : 0 
        }}
      >
        {subText}
      </div>
    </>
  );
};

export default CardTrack;