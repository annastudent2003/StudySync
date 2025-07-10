import React, { useState, useEffect } from 'react';
import '../index.css';

const Planner = () => {
const [formData, setFormData] = useState({
mood: '',
goals: '',
priorities: '',
schedule: '',
notes: ''
});

const [selectedDate, setSelectedDate] = useState(() =>
new Date().toISOString().split('T')[0]
);
const [autoWeather, setAutoWeather] = useState('');
const [showSaved, setShowSaved] = useState(false);

const saveData = () => {
const stored = JSON.parse(localStorage.getItem('plannerData')) || {};
stored[selectedDate] = { ...formData, weather: autoWeather };
localStorage.setItem('plannerData', JSON.stringify(stored));
setShowSaved(true);
setTimeout(() => setShowSaved(false), 2000);
};

const loadData = () => {
const stored = JSON.parse(localStorage.getItem('plannerData')) || {};
if (stored[selectedDate]) {
const { mood, goals, priorities, schedule, notes } = stored[selectedDate];
setFormData({ mood, goals, priorities, schedule, notes });
} else {
setFormData({ mood: '', goals: '', priorities: '', schedule: '', notes: '' });
}
};

useEffect(() => {
  loadData();
}, [loadData]);


useEffect(() => {
const fetchWeather = async () => {
try {
const position = await new Promise((resolve, reject) => {
navigator.geolocation.getCurrentPosition(resolve, reject);
});
    const { latitude, longitude } = position.coords;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();
    const weather = weatherData.current_weather;
    const code = weather.weathercode;
    const temp = weather.temperature;

    let icon = '☀️ Sunny';
    if ([45, 48].includes(code)) icon = '🌫️ Foggy';
    else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) icon = '🌧️ Rainy';
    else if ([71, 73, 75, 77, 85, 86].includes(code)) icon = '❄️ Snowy';
    else if ([95, 96, 99].includes(code)) icon = '⛈️ Thunder';

    setAutoWeather(`${icon} ${temp}°C`);
  } catch (error) {
    console.log('Weather API error:', error);
    setAutoWeather('N/A');
  }
};

fetchWeather();
}, []);

const moodOptions = [
{ label: '😀', value: 'happy' },
{ label: '😍', value: 'love' },
{ label: '😐', value: 'neutral' },
{ label: '🙁', value: 'sad' },
{ label: '😩', value: 'tired' },
{ label: '😴', value: 'sleepy' }
];

return (
<div className="dashboard-wrapper">
<h2 className="header-title">Daily Planner</h2>

  <div className="planner-grid">
    <div className="planner-box date-box">
      <label>Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
      />
    </div>

    <div className="planner-box weather-box">
      <label>Weather:</label>
      <div className="weather-icon">{autoWeather}</div>
    </div>

    <div className="planner-box mood-box">
      <label>Today's Mood:</label>
      <div className="mood-options">
        {moodOptions.map(mood => (
          <span
            key={mood.value}
            className={`mood-face ${formData.mood === mood.value ? 'selected' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
          >
            {mood.label}
          </span>
        ))}
      </div>
    </div>

    <div className="planner-box priorities-box">
      <label>Top Priorities:</label>
      <textarea
        className="lined-textarea"
        value={formData.priorities}
        onChange={e => setFormData({ ...formData, priorities: e.target.value })}
        placeholder="🍓 Write your top 3 tasks"
      />
    </div>

    <div className="planner-box goals-box">
      <label>Goals:</label>
      <textarea
        className="lined-textarea"
        value={formData.goals}
        onChange={e => setFormData({ ...formData, goals: e.target.value })}
        placeholder="🎯 What are your daily goals?"
      />
    </div>

    <div className="planner-box schedule-box">
      <label>Schedule:</label>
      <textarea
        className="lined-textarea"
        value={formData.schedule}
        onChange={e => setFormData({ ...formData, schedule: e.target.value })}
        placeholder="🕒 Time blocks..."
      />
    </div>

    <div className="planner-box notes-box">
      <label>Notes:</label>
      <textarea
        value={formData.notes}
        onChange={e => setFormData({ ...formData, notes: e.target.value })}
        placeholder="💬 Add anything else..."
      />
    </div>
  </div>

  <button className="save-button" onClick={saveData}>Save</button>
  {showSaved && <p className="saved-message">✅ Saved successfully!</p>}
</div>
);
};

export default Planner;
