import React, { useState, useEffect, useCallback, useMemo } from "react";
import TopBar from "../components/Gugu/TopBar/topbar";
import Slogan from "../components/Gugu/Slogan/slogan";
import ProductsSection from "../components/Gugu/ProductSection/productSection";
import FeatureCard from "../components/Gugu/FeatureCard/featureCard";
import ScrollPrompt from "../components/Gugu/ScrollPrompt/scrollPrompt"
const GuguPage = () => {
  const [activeNav, setActiveNav] = useState("网站主页");
  const [virtualScrollY, setVirtualScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const img = "https://images.unsplash.com/photo-1749928384244-818a191d9ac7?q=80&w=1660&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const [products] = useState([
    {
      id: 1,
      name: "高端设计套装",
      description: "专为企业形象打造的高端设计解决方案，包含品牌标识、宣传物料和数字媒体设计",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "智能办公系统",
      description: "集成化的智能办公平台，提高团队协作效率，优化工作流程",
      image: "https://images.unsplash.com/photo-1750173360515-05ca2fb9873d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "数据分析工具",
      description: "强大的商业数据分析工具，帮助您从数据中发现价值，做出明智决策",
      image: "https://images.unsplash.com/photo-1722904218663-f8b880a6823e?q=80&w=780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ]);

  const scrollConfig = useMemo(() => ({
    maxVirtualScroll: windowHeight,
    breakpoints: [
      { virtualRange: [0, 0], name: "home" },
      { virtualRange: [0, windowHeight], name: "veil" }
    ]
  }), [windowHeight]);

  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const deltaY = e.deltaY / 2;
    setVirtualScrollY((prev) => {
      return Math.min(
        Math.max(0, prev + deltaY),
        scrollConfig.maxVirtualScroll
      );
    });
  }, [scrollConfig]);

  const veilStyle = useMemo(() => {
    const progress = Math.min(virtualScrollY / windowHeight, 1);
    return {
      transform: `translateY(${100 - progress * 100}vh)`,
      backdropFilter: `blur(${10}px)`,
      opacity: 1
    };
  }, [virtualScrollY, windowHeight]);

  const sloganStyle = useMemo(() => {
    const progress = Math.min(virtualScrollY / windowHeight, 1);
    return {
      transform: `translateY(${0 - progress * 100}vh)`,
      opacity: (1 - progress * 6)
    };
  }, [virtualScrollY, windowHeight]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleResize, handleWheel]);

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
  };

  return (
    <div className="gugu-page" style={{ '--bg-image': `url(${img})` }}>
      <TopBar activeNav={activeNav} handleNavClick={handleNavClick} />
      <Slogan style={sloganStyle} />
      <FeatureCard virtualScrollY={virtualScrollY} windowHeight={windowHeight} />
      <ProductsSection style={veilStyle} products={products} />
      <ScrollPrompt style={sloganStyle}/>

    </div>
  );
};

export default GuguPage;