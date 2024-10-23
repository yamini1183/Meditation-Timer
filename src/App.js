import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(5 * 60); // Default 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [language, setLanguage] = useState('en'); // Language state (English as default)

  // Time format (mm:ss)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Countdown effect
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
      setHasFinished(true);
      playSound();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
    setHasFinished(false);
  };

  // Reset timer
  const resetTimer = () => {
    setTime(5 * 60); // Reset to 5 minutes
    setIsActive(false);
    setHasFinished(false);
  };

  // Play sound when time ends
  const playSound = () => {
    const audio = new Audio('/calming-sound.mp3');
    audio.play();
  };

  // Switch language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  // Text in English and Hindi
  const translations = {
    en: {
      title: "Meditation Timer 🧘",
      start: "Start",
      pause: "Pause",
      reset: "Reset",
      timeUp: "Time's Up!",
      lang: "Switch to Hindi"
    },
    hi: {
      title: "ध्यान समय🧘",
      start: "शुरू करें",
      pause: "रोकें",
      reset: "रीसेट करें",
      timeUp: "समय समाप्त!",
      lang: "अंग्रेज़ी में स्विच करें"
    }
  };

  return (
    <div className="App">
      <h1>{translations[language].title}</h1>

      <div className="timer-display">
        {hasFinished ? translations[language].timeUp : formatTime(time)}
      </div>

      <div className="controls">
        <button onClick={toggleTimer}>
          {isActive ? translations[language].pause : translations[language].start}
        </button>
        <button onClick={resetTimer}>{translations[language].reset}</button>
      </div>

      <button className="language-switch" onClick={toggleLanguage}>
        {translations[language].lang}
      </button>
    </div>
  );
}

export default App;
