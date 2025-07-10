import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Planner from './pages/Planner';
import Dashboard from './pages/Dashboard';
import Quotes from './pages/Quotes';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

