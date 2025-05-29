// src/components/HealthTips.js

import React from "react";
import "./HealthTips.css";

const tips = [
  { icon: "💧", text: "Drink plenty of water." },
  { icon: "🏃‍♀️", text: "Exercise at least 30 minutes a day." },
  { icon: "🛌", text: "Get 7-8 hours of sleep daily." },
  { icon: "🍎", text: "Eat fruits and vegetables regularly." },
  { icon: "🧘‍♂️", text: "Practice mindfulness and manage stress." },
];

const HealthTips = () => {
  return (
    <div className="health-tips-container">
      <h2 className="tips-heading">✨ Healthy Habits ✨</h2>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <div className="tip-text">{tip.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;

