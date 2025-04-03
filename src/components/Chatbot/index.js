import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Import the Markdown parser
import rehypeRaw from "rehype-raw"; // Import rehypeRaw to properly render markdown

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const newMessages = [...messages, { sender: "user", text: message }];
        setMessages(newMessages);
        setMessage("");
        setLoading(true);

        try {
            const res = await axios.post('https://intern-scheduling-backend.vercel.app/chatbot', { message });

            setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
        } catch (error) {
            setMessages([...newMessages, { sender: "bot", text: "⚠️ Error getting response. Please try again." }]);
        }

        setLoading(false);
    };

    return (
        <div>
            {!showChat && (
                <button style={toggleButtonStyle} onClick={() => setShowChat(true)}>💬 Chat</button>
            )}

            {showChat && (
                <div style={chatContainerStyle}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ margin: 0 }}>Medical Chatbot</h3>
                        <button onClick={() => setShowChat(false)} style={{ background: "none", border: "none", fontSize: "15px", cursor: "pointer" }}>❌</button>
                    </div>

                    <div style={chatBoxStyle}>
                        {messages.map((msg, index) => (
                            <div key={index} style={msg.sender === "user" ? userMessageStyle : botMessageStyle}>
                                <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
                                {msg.sender === "bot" ? (
                                    <div className="bot-markdown">
                                        <ReactMarkdown children={msg.text} rehypePlugins={[rehypeRaw]} />
                                    </div>
                                    ) : (
                                    <span style={{ whiteSpace: "pre-wrap" }}>{msg.text}</span>
                                )}


                            </div>
                        ))}
                        {loading && <p>⏳ Thinking...</p>}
                    </div>

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask a medical question..."
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        style={inputStyle}
                    />
                    <button onClick={sendMessage} disabled={loading} style={buttonStyle}>
                        {loading ? "Thinking..." : "Send"}
                    </button>
                </div>
            )}
        </div>
    );
};

// Floating Chatbot Styles
const chatContainerStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "500px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    zIndex: "1000",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
};

const chatBoxStyle = {
    minHeight: "300px",
    maxHeight: "400px",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#f7f7f7",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "14px",
    color: "#333",
};

const userMessageStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "5px",
    textAlign: "right",
};

const botMessageStyle = { 
    backgroundColor: "#e0e0e0", 
    padding: "30px", 
    borderRadius: "5px", 
    textAlign: "left", 
    whiteSpace: "pre-wrap",  // Ensures proper text wrapping
    fontSize: "14px",
    display: "block",
    wordWrap: "break-word", // Prevents long words from overflowing
    marginBottom: "5px",
    lineHeight: "1.5" // Improves readability
};

const toggleButtonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    zIndex: "1001",
    fontSize: "16px",
};

const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
};

export default Chatbot;
