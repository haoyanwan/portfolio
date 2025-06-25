import React, { useState, useEffect, useCallback, useMemo } from "react";
import logo from "./logo.svg";

const GuguPage = () => {
  const [activeNav, setActiveNav] = useState("网站主页");
  const [virtualScrollY, setVirtualScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const img = "https://images.unsplash.com/photo-1749928384244-818a191d9ac7?q=80&w=1660&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const productImg = [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1750173360515-05ca2fb9873d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1722904218663-f8b880a6823e?q=80&w=780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  // Configuration for scroll behavior
  const scrollConfig = useMemo(() => ({
    maxVirtualScroll: windowHeight, // Adjust as needed
    breakpoints: [
      { virtualRange: [0, 0], name: "home" },
      { virtualRange: [0, windowHeight], name: "veil" }
    ]
  }), [windowHeight]);

  // Handle window resize
  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  // Handle wheel events for custom scrolling
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const deltaY = e.deltaY / 2;
    setVirtualScrollY((prev) => {
      console.log(prev)
      return Math.min(
        Math.max(0, prev + deltaY),
        scrollConfig.maxVirtualScroll
      );
    });
  }, [scrollConfig]);

  // Calculate veil position and blur amount
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
      opacity: (1 - progress * 3)
    };
  }, [virtualScrollY, windowHeight]);

  // Set up event listeners
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

  const [products] = useState([
    {
      id: 1,
      name: "高端设计套装",
      description: "专为企业形象打造的高端设计解决方案，包含品牌标识、宣传物料和数字媒体设计",
      image: productImg[0]
    },
    {
      id: 2,
      name: "智能办公系统",
      description: "集成化的智能办公平台，提高团队协作效率，优化工作流程",
      image: productImg[1]
    },
    {
      id: 3,
      name: "数据分析工具",
      description: "强大的商业数据分析工具，帮助您从数据中发现价值，做出明智决策",
      image: productImg[2]
    },
  ]);

  return (
    <div
      className="gugu-page"
      style={{ '--bg-image': `url(${img})` }}
    >
      {/* Top Bar with Logo and Navigation */}
      <div className="top-bar">
        {/* Company Logo + Name */}
        <div className="company-header">
          <img src={logo} alt="Company Logo" className="company-logo" />
          <span className="company-title">公司名称</span>
        </div>

        {/* Navigation Bar */}
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a
                href="#home"
                className={activeNav === "网站主页" ? "active" : ""}
                onClick={() => handleNavClick("网站主页")}
              >
                网站主页
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about"
                className={activeNav === "关于我们" ? "active" : ""}
                onClick={() => handleNavClick("关于我们")}
              >
                关于我们
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#cases"
                className={activeNav === "经典案例" ? "active" : ""}
                onClick={() => handleNavClick("经典案例")}
              >
                经典案例
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#products"
                className={activeNav === "产品" ? "active" : ""}
                onClick={() => handleNavClick("产品")}
              >
                产品
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className={activeNav === "联系我们" ? "active" : ""}
                onClick={() => handleNavClick("联系我们")}
              >
                联系我们
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Company Slogan */}
      <div className="company-slogan-group" style={sloganStyle}>
        <div className="company-slogan">专业</div>
        <div className="company-slogan">打造高品质产品</div>
        <div className="company-description">professional</div>
        <div className="company-description">...</div>
      </div>

      {/* Veil that moves up with blur effect */}
      <div className="veil" style={veilStyle}>
        <div className="company-product-group">
          <div className="company-product">产品介绍</div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <button className="product-button">了解更多</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuguPage;