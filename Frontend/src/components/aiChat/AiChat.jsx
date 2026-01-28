import React, { useState, useRef, useEffect } from "react";
import "./AiChat.scss";
import newRequest from "../../utils/newRequest";

const AiChat = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 I'm your Skillverse Assistant. I can see live gigs and orders. How can I help?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, open]);

    const handleSend = async (e, textOverride = null) => {
        if (e) e.preventDefault();
        const userInput = textOverride || input;
        if (!userInput.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: userInput, sender: "user" };
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
                msg.id === loadingId ? { ...msg, text: "Sorry, I couldn't reach the brain. Is the Python service running?", isLoading: false, isError: true } : msg
            ));
        }
    };

    // Helper to render links
    const renderMessage = (text) => {
        // Regex to find markdown links: [Title](/url)
        const parts = text.split(/(\[.*?\]\(.*?\))/g);

        return parts.map((part, index) => {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                return <a key={index} href={match[2]} style={{ color: '#4e54c8', textDecoration: 'underline', fontWeight: 'bold' }}>{match[1]}</a>;
            }
            return part;
        });
    };

    return (
        <div className={`ai-chat ${open ? "open" : ""}`}>
            {!open && (
                <div className="chat-trigger" onClick={() => setOpen(true)}>
                    <img src="/img/bot-icon.png" alt="AI" onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"} />
                    <span className="tooltip">AI Assistant</span>
                </div>
            )}

            {open && (
                <div className="chat-window">
                    <div className="header">
                        <div className="title">
                            <span className="status-dot"></span>
                            <h3>Skillverse Brain</h3>
                            <span className="badge">LIVE</span>
                        </div>
                        <button className="close-btn" onClick={() => setOpen(false)}>×</button>
                    </div>

                    <div className="messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender} ${msg.isError ? 'error' : ''}`}>
                                <p>{msg.isLoading ? <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span> : renderMessage(msg.text)}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestion Chips */}
                    <div className="chips">
                        <button onClick={(e) => handleSend(e, "What gigs do you recommend for me?")}>🌟 Recommended Gigs</button>
                        <button onClick={(e) => handleSend(e, "Recommend top 3 gigs")}>🔥 Top Gigs</button>
                        <button onClick={(e) => handleSend(e, "Who are the newest sellers?")}>👤 New Sellers</button>
                    </div>

                    <form className="input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Ask about gigs, users..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit">➤</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AiChat;
