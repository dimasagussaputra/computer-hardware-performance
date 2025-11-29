// src/pages/TipsPage.jsx
import React from "react";

export default function TipsPage({ onNavigate }) {
  const tips = [
    {
      title: "Keep Your CPU Cool",
      desc: "High temperatures can reduce CPU performance. Clean the heatsink and ensure proper airflow inside the case."
    },
    {
      title: "Use Dual-Channel RAM",
      desc: "Using two RAM sticks doubles memory bandwidth and improves performance for gaming and multitasking."
    },
    {
      title: "Upgrade to SSD",
      desc: "Switching from HDD to SSD dramatically boosts boot time and app loading speeds."
    },
    {
      title: "Optimize GPU Settings",
      desc: "Adjust in-game graphics settings or use GPU software to balance quality and performance."
    },
    {
      title: "Clean Dust Regularly",
      desc: "Dust buildup blocks airflow and increases temperature. Clean your PC every 2 to 3 months."
    },
  ];

  return (
    <div>
      <style>{`
        .tips-container {
          padding: 40px 20px;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          color: #ffffff;
        }

        .tips-title {
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #ffffff;
          text-shadow: 0 0 8px rgba(255,255,255,0.25);
        }

        .tip-card {
          background: #2a2d3a;
          border: 1px solid #aaaaaaff;
          padding: 20px;
          margin: 15px 0;
          border-radius: 14px;
          text-align: left;
          transition: all 0.25s ease;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.45);
        }

        .tip-card:hover {
          transform: translateY(-4px);
          border-color: #3700ffff ;
          box-shadow: 0 0 15px rgba(77,163,255,0.45);
        }

        .tip-card h3 {
          margin: 0 0 8px;
          font-size: 20px;
          color: #ffffff;
        }

        .tip-card p {
          margin: 0;
          color: #e6e6e6;
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .tips-title {
            font-size: 24px;
          }
          .tip-card {
            padding: 16px;
          }
        }
      `}</style>

      <div className="tips-container">
        <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: 'white' }}>Tips & Tricks</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.85, color: 'white' }}>Improve Your Hardware Performance</p>

        {tips.map((item, index) => (
          <div key={index} className="tip-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
