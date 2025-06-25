import React, { useMemo } from "react";

const FeatureCard = ({ virtualScrollY, windowHeight }) => {
    const cardStyle = useMemo(() => {
        const progress = Math.min(virtualScrollY / windowHeight, 1);
        return {
            transform: `translateY(${0 - progress * 100}vh)`,
            opacity: 1 - progress * 6
        };
    }, [virtualScrollY, windowHeight]);

    const features = [
        {
            title: "化学分析",
            description: "先进的化学物质分析与检测技术",
            image: "https://images.unsplash.com/photo-1518842013791-b874be246c34?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        },
        {
            title: "实验模拟",
            description: "虚拟实验室环境与化学反应模拟",
            image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        },
        {
            title: "材料研发",
            description: "新型材料开发与性能测试",
            image: "https://images.unsplash.com/photo-1475906089153-644d9452ce87?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        }

    ];

    return (
        <div className="feature-card-container" style={cardStyle}>
            {features.map((feature, index) => (
                <div key={index} className="feature-card">
                    <div className="feature-image-container">
                        <img src={feature.image} alt={feature.title} className="feature-image" />
                    </div>
                    <div className="feature-content">
                        <p className="feature-description">{feature.description}</p>
                        <div className="feature-bubble">{feature.title}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeatureCard;