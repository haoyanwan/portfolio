import React, { useEffect, useState, useCallback, useMemo } from "react";
import CardTrack from "../components/CardTrack";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import About from "../components/About";
import Contact from "../components/Contact";
import { getScrollConfig } from "../utils/scrollConfig";

function Landing() {
  /*** State ***/
  const [virtualScrollY, setVirtualScrollY] = useState(0);
  const [actualScrollY, setActualScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [tab, setTab] = useState("Home");

  /*** Config & derived values ***/
  const scrollConfig = useMemo(() => getScrollConfig(windowHeight), [windowHeight]);

  const dotsBackgroundSize = useMemo(() => {
    const scrollProgress = virtualScrollY / scrollConfig.maxVirtualScroll;
    const minSize = 6;
    const maxSize = 12;
    const currentSize = minSize + (maxSize - minSize) * scrollProgress;
    return `${currentSize}vmin ${currentSize}vmin`;
  }, [virtualScrollY, scrollConfig.maxVirtualScroll]);

  /*** Scroll helpers (calculations & animation) ***/
  // Smoothly animates scroll to target position using requestAnimationFrame
  const smoothScrollTo = useCallback((targetY, duration = 500) => {
    const element = document.getElementById("root");
    const startY = element.scrollTop;
    const distance = targetY - startY;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.scrollTo({ top: startY + distance * eased });

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  // Converts virtual scroll position to actual scroll position based on breakpoints
  const calculateActualScroll = useCallback(
    (virtualY) => {
      let totalVirtualOffset = 0;

      for (const breakpoint of scrollConfig.breakpoints) {
        const [start, end] = breakpoint.virtualRange;
        if (virtualY >= start && virtualY <= end) {
          const dynamicActualLock = start - totalVirtualOffset;
          return Math.max(0, dynamicActualLock);
        } else if (virtualY > end) {
          totalVirtualOffset += end - start;
        }
      }

      const actualY = virtualY - totalVirtualOffset;
      return Math.max(0, actualY);
    },
    [scrollConfig]
  );

  // Finds which breakpoint the current virtual scroll position falls within
  const getCurrentBreakpoint = useCallback(() => {
    return scrollConfig.breakpoints.find(
      (bp) =>
        virtualScrollY >= bp.virtualRange[0] &&
        virtualScrollY <= bp.virtualRange[1]
    );
  }, [scrollConfig.breakpoints, virtualScrollY]);

  /*** Tab / navigation helpers ***/
  const updateActiveTab = useCallback(
    (scrollY) => {
      const currentIndex = scrollConfig.breakpoints.findIndex(
        (bp) => scrollY >= bp.virtualRange[0] && scrollY <= bp.virtualRange[1]
      );
      if (currentIndex >= 0) {
        const tabs = ["Home", "Work", "About", "Contact"];
        setTab(tabs[currentIndex] || "Home");
      }
    },
    [scrollConfig.breakpoints]
  );

  const navigateToSection = useCallback(
    (targetVirtualY) => {
      setVirtualScrollY(targetVirtualY);
      const newActual = calculateActualScroll(targetVirtualY);
      setActualScrollY(newActual);
      smoothScrollTo(newActual);
      updateActiveTab(targetVirtualY);
    },
    [calculateActualScroll, smoothScrollTo, updateActiveTab]
  );

  /*** Event handlers ***/
  // Updates window height on resize
  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  // Handles wheel events and updates virtual/actual scroll positions
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const deltaY = e.deltaY / 2;

      setVirtualScrollY((prevVirtual) => {
        const newVirtual = Math.min(
          Math.max(0, prevVirtual + deltaY),
          scrollConfig.maxVirtualScroll
        );

        const newActual = calculateActualScroll(newVirtual);
        setActualScrollY(newActual);

        if (Math.abs(deltaY) >= 25) {
          smoothScrollTo(newActual);
          console.log("Smooth scroll to:", newActual);
        } else {
          const element = document.getElementById("root");
          element.scrollTo({ top: newActual });
        }

        updateActiveTab(newVirtual);
        return newVirtual;
      });
    },
    [calculateActualScroll, scrollConfig, smoothScrollTo, updateActiveTab]
  );

  /*** Effects ***/
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  /*** Render ***/
  return (
    <div className="MainLayout">
      {/* Navigation Bar */}
      <Navigation
        onNavigate={navigateToSection}
        windowHeight={windowHeight}
        tab={tab}
        scrollConfig={scrollConfig}
      />

      {/* Dots Background Overlay with dynamic sizing */}
      <div
        className="dots-background"
        style={{ backgroundSize: dotsBackgroundSize }}
      />

      {/* Main content sections */}
      <div className="breakSection" id="hero">
        <Hero
          virtualScrollY={virtualScrollY}
          actualScrollY={actualScrollY}
          currentBreakpoint={getCurrentBreakpoint()}
        />
      </div>

      <div className="breakSection" id="track">
        <CardTrack
          virtualScrollY={virtualScrollY}
          actualScrollY={actualScrollY}
          currentBreakpoint={getCurrentBreakpoint()}
        />
      </div>

      <div className="breakSection" id="about">
        <About
          virtualScrollY={virtualScrollY}
          actualScrollY={actualScrollY}
          currentBreakpoint={getCurrentBreakpoint()}
        />
      </div>

      <div className="breakSection" id="contact">
        <Contact
          virtualScrollY={virtualScrollY}
          actualScrollY={actualScrollY}
          currentBreakpoint={getCurrentBreakpoint()}
        />
      </div>

      {/* Debug info */}
      <div className="debug-info">
        <div>Virtual: {Math.round(virtualScrollY)}</div>
        <div>Actual: {Math.round(actualScrollY)}</div>
        <div>Window Height: {windowHeight}</div>
        <div>Breakpoint: {getCurrentBreakpoint()?.name || "none"}</div>
        <div>Recruiter: hopefully watching ...</div>
      </div>
    </div>
  );
}

export default Landing;
