import React, { useEffect, useState } from 'react';
import '../index.css';
import Img1 from '../assets/dashboard1.jpeg';
import Img2 from '../assets/dashboard2.jpeg';
import Img3 from '../assets/dashboard3.jpeg';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [priorities, setPriorities] = useState([]);
  const [schedule, setSchedule] = useState('');
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const studyInterval = setInterval(() => {
      setStudyMinutes(prev => prev + 1);
    }, 60000); // 1 minute = 60000ms

    return () => clearInterval(studyInterval);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const stored = JSON.parse(localStorage.getItem('plannerData')) || {};
    if (stored[today]) {
      setPriorities(
        stored[today].priorities
          ? stored[today].priorities.split('\n').map(line => ({ text: line, done: false }))
          : []
      );
      setSchedule(stored[today].schedule || '');
    } else {
      setPriorities([]);
      setSchedule('');
    }
  }, []);

  const toggleDone = (index) => {
    const updated = [...priorities];
    updated[index].done = !updated[index].done;
    setPriorities(updated);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Dashboard</h2>

      <div className="dashboard-grid">
        <div className="image-stack-vertical">
          <img src={Img1} alt="Img1" className="image-half-vertical" />
          <img src={Img2} alt="Img2" className="image-half-vertical" />
        </div>

        <div className="dashboard-card">
          <h3>🕒 Current Time</h3>
          <p>{time.toLocaleTimeString()}</p>
        </div>

        <div className="dashboard-card">
          <h3>⏱ Study Tracker</h3>
          <p>Study: {studyMinutes} min</p>
          <p>Break: {breakMinutes} min</p>
          <div className="pie-placeholder">
            <div className="pie-chart-text">[ Pie Chart Placeholder ]</div>
          </div>
        </div>

        <div className="image-stack-horizontal">
          <img src={Img3} alt="Img3" className="image-half-horizontal" />
          {userImage ? (
            <img src={userImage} alt="User Upload" className="dashboard-img user-circle" />
          ) : (
            <label className="upload-section">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-circle"
              />
              Upload
            </label>
          )}
        </div>

        <div className="dashboard-card checklist-box">
          <h3>✅ Today's Top Priorities</h3>
          {priorities.length === 0 ? (
            <p className="empty-placeholder">(No priorities entered today)</p>
          ) : (
            <ul>
              {priorities.map((item, i) => (
                <li key={i} onClick={() => toggleDone(i)} className={item.done ? 'done' : ''}>
                  <input type="checkbox" checked={item.done} readOnly /> {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dashboard-card">
          <h3>📅 Daily Schedule</h3>
          {schedule ? (
            <pre className="schedule-text">{schedule}</pre>
          ) : (
            <p className="empty-placeholder">(No schedule available for today)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
