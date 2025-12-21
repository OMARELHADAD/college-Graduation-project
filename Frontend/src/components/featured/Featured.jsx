import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import Hero3D from "../hero3D/Hero3D";

function Featured() {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  // Voice Recognition Logic
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser doesn't support Speech API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false; // Stop after one sentence

    recognition.onstart = () => {
      setIsListening(true);
      setInput("Listening...");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Optional: Auto-search after voice input
      // navigate(`/gigs?search=${transcript}`); 
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };


  const handleSubmit = () => {
    if (input.trim() && input !== "Listening...") {
      navigate(`/gigs?search=${input}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="featured starlight-bg">
      <div className="stars-large"></div>
      <div className="container">
        <div className="left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Find the perfect <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(270deg, #ff00cc, #333399, #00d2ff)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                padding: "0 5px"
              }}
            >freelance</motion.span> services for your business
          </motion.h1>
          <motion.div
            className="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="searchInput">
              <img src="/img/search.png" alt="search" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {/* Voice Button */}
              <button
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                onClick={handleVoiceSearch}
                title="Voice Search"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontSize: '20px',
                  color: isListening ? '#ff4757' : 'gray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  animation: isListening ? 'pulse 1.5s infinite' : 'none'
                }}
              >
                {isListening ? '🛑' : '🎙️'}
              </button>
            </div>
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </motion.div>
          <motion.div
            className="popular"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <span>Popular:</span>
            <button onClick={() => navigate('/gigs?search=web design')}>Web Design</button>
            <button onClick={() => navigate('/gigs?search=wordpress')}>WordPress</button>
            <button onClick={() => navigate('/gigs?search=logo design')}>Logo Design</button>
            <button onClick={() => navigate('/gigs?search=ai services')}>AI Services</button>
          </motion.div>
        </div>
        <div className="right">
          <motion.img
            src="/img/man.png"
            alt="man"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Featured;
