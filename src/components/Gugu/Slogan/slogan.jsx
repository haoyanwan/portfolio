// components/Slogan.js
import React from "react";

const Slogan = ({ style }) => {
  return (
    <div className="company-slogan-group" style={style}>
      <div className="company-slogan">专业</div>
      <div className="company-slogan">打造高品质产品</div>
      <div className="company-description">专业的团队，20年的经验</div>
      <div className="company-description">精致打造</div>
    </div>
  );
};

export default Slogan;