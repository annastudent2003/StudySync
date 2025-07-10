import React from 'react';
import '../index.css';
import bgImage from '../assets/background-img.jpeg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div className="home-box">
        <h1 className="home-title">Welcome to StudySync</h1>
        <p className="home-subtitle">Plan smarter. Study better. Track everything.</p>
        <Link to="/planner" className="home-button">Get Started</Link>
      </div>
    </div>
  );
};

export default Home;
