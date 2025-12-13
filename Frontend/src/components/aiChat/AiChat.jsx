import React, { useState, useRef, useEffect } from "react";
import "./AiChat.scss";
import newRequest from "../../utils/newRequest";

const AiChat = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 I'm your Skillverse Assistant. Looking for a specific service or need help?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // Add loading placeholder
        const loadingId = Date.now() + 1;
        setMessages((prev) => [...prev, { id: loadingId, text: "Thinking...", sender: "bot", isLoading: true }]);

        try {
            // Call backend API
            const res = await newRequest.post("/api/ai", { message: userMsg.text });

            // Replace loading with actual response
            setMessages((prev) => prev.map(msg =>
                msg.id === loadingId ? { ...msg, text: res.data.response, isLoading: false } : msg
            ));
        } catch (err) {
            console.error(err);
            setMessages((prev) => prev.map(msg =>
                msg.id === loadingId ? { ...msg, text: "Sorry, I'm having trouble connecting to the AI brain right now. Please ensure the AI service is running.", isLoading: false, isError: true } : msg
            ));
        }
    };

    return (
        <div className={`ai-chat ${open ? "open" : ""}`}>
            {!open && (
                <div className="chat-trigger" onClick={() => setOpen(true)}>
                    <img src="/img/bot-icon.png" alt="AI" onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"} />
                    <span className="tooltip">Need help?</span>
                </div>
            )}

            {open && (
                <div className="chat-window">
                    <div className="header">
                        <div className="title">
                            <span className="status-dot" style={{ background: "#2ecc71", boxShadow: "0 0 5px #2ecc71" }}></span>
                            <h3>Skillverse AI</h3>
                            <span className="badge">Beta</span>
                        </div>
                        <button className="close-btn" onClick={() => setOpen(false)}>×</button>
                    </div>

                    <div className="messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AiChat;
