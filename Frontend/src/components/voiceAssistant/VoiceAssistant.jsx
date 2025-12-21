import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceAssistant.scss';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const navigate = useNavigate();

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    useEffect(() => {
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript("Listening...");
        };

        recognition.onend = () => {
            setIsListening(false);
            // Clear transcript after a delay
            setTimeout(() => setTranscript(''), 2000);
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            setTranscript(`"${command}"`);
            processCommand(command);
        };

        if (isListening) {
            try {
                recognition.start();
            } catch (err) {
                // Already started or busy
            }
        }

        // Cleanup not strictly feasible with this simple toggle logic inside effect dependency loop 
        // but works for basic implementation. Better to use a class or ref for recognition instance.

        // Using a ref for the recognition instance would be cleaner, but creating it here for simplicity.
        // Ideally we define 'recognition' outside or in a ref. Let's stick to simple event binding for now.

        // Actually, we need to trigger start() from the button click, not the effect.
        // Retaining logic in handleListen.

    }, []);

    const handleListen = () => {
        if (!SpeechRecognition) {
            alert("Browser doesn't support Speech API");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            processCommand(text);
        };

        recognition.start();
    };

    const processCommand = (text) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('home')) {
            navigate('/');
        } else if (lowerText.includes('gigs') || lowerText.includes('browse')) {
            navigate('/gigs');
        } else if (lowerText.includes('orders')) {
            navigate('/orders');
        } else if (lowerText.includes('messages')) {
            navigate('/messages');
        } else if (lowerText.includes('search for')) {
            const query = lowerText.replace('search for', '').trim();
            navigate(`/gigs?search=${query}`);
        } else if (lowerText.includes('go to')) {
            // "Go to login", "Go to register"
            const parts = lowerText.split('go to ');
            if (parts[1]) {
                const dest = parts[1].replace(/\s/g, ''); 
                navigate(`/${dest}`);
            }
        }
    };

    if (!SpeechRecognition) return null; 

    return (
        <div className="voice-assistant">
            {transcript && <div className="transcript-bubble">{transcript}</div>}
            <button
                className={`mic-button ${isListening ? 'listening' : ''}`}
                onClick={handleListen}
                title="Voice Navigation"
            >
                {isListening ? (
                   
                    <span>🎤</span>
                ) : (
                    <span>🎙️</span>
                )}
            </button>
        </div>
    );
};

export default VoiceAssistant;
