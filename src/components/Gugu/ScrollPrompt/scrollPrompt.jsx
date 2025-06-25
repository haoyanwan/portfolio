import React, { useState, useEffect } from "react";



const ScrollPrompt = ({style}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="scroll-prompt-container" style={style}>
      <div className="scroll-prompt-bubble">
        向下滚动查看更多内容
        <div className="scroll-prompt-arrow">↓</div>
      </div>
    </div>
  );
};

export default ScrollPrompt