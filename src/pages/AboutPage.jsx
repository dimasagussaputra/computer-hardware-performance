// src/pages/AboutPage.jsx
import React from "react";
import logo from "../assets/logo512.png";

export default function AboutPage() {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <style>{`
        .about-wrapper {
          padding: 40px 20px;
          text-align: center;
          color: white;
          max-width: 900px;
          margin: 0 auto;
        }

        .about-logo {
          display: flex;
          justify-content: center;
          height: 40vmin;
          margin-bottom: 15px;
        }

        .about-logo img {
          width: 40vmin;
          height: 40vmin;
          transition: transform 0.35s ease, filter 0.35s ease;
        }

        .about-logo img:hover {
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 0 12px rgba(38, 0, 255, 1));
        }

        @media (prefers-reduced-motion: no-preference) {
          .about-logo img {
            animation: about-logo-spin infinite 18s linear;
          }
        }

        @keyframes about-logo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .about-desc-container {
          display: flex;
          padding-left: 40px;
          padding-right: 40px;
          justify-content: center;
        }

        .about-desc {
          font-family: Verdana, sans-serif;
          font-weight: 300;
          font-size: 21px;
          line-height: 1.7;
          color: #ffffff;
          text-align: center;
        }
      `}</style>

      <div className="about-wrapper">
        <div className="about-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="about-desc-container">
          <h1 className="about-desc">
            Computer Hardware Performance is a Progressive Web App (PWA)-based application that displays several of the best computer parts based on benchmarks.
            This application project covers six categories of hardware, namely CPU, GPU, RAM, SSD, HDD, and USB.
            This application project was created as a final project for the Praktikum Pemrograman Perangkat Bergerak.
          </h1>
        </div>
      </div>
    </div>
  );
}
