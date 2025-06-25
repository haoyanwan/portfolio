// components/TopBar.js
import React from "react";
import logo from "./logo.svg";

const TopBar = ({ activeNav, handleNavClick }) => {
  return (
    <div className="top-bar">
      <div className="company-header">
        <img src={logo} alt="Company Logo" className="company-logo" />
        <span className="company-title">公司名称</span>
      </div>

      <nav className="main-nav">
        <ul className="nav-list">
          {["网站主页", "关于我们", "经典案例", "产品", "联系我们"].map((navItem) => (
            <li key={navItem} className="nav-item">
              <a
                href={`#${navItem}`}
                className={activeNav === navItem ? "active" : ""}
                onClick={() => handleNavClick(navItem)}
              >
                {navItem}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;