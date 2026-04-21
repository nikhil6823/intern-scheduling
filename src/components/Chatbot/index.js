import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://intern-scheduling-backend.vercel.app/chatbot",
        { message }
      );

      const botMsg = {
        sender: "bot",
        text: res.data.reply,
      };

      setMessages([...updatedMessages, botMsg]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          sender: "bot",
          text: "⚠️ Error getting response. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div>
      {!showChat && (
        <button style={toggleButtonStyle} onClick={() => setShowChat(true)}>
          💬 Chat
        </button>
      )}

      {showChat && (
        <div style={chatContainerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Medical Chatbot</h3>
            <button onClick={() => setShowChat(false)}>❌</button>
          </div>

          <div style={chatBoxStyle}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.sender === "user"
                    ? userMessageStyle
                    : botMessageStyle
                }
              >
                <strong>
                  {msg.sender === "user" ? "You: " : "Bot: "}
                </strong>

                {msg.sender === "bot" ? (
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
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

// ===== Styles =====
const chatContainerStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "400px",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "10px",
  zIndex: "1000",
};

const chatBoxStyle = {
  maxHeight: "300px",
  overflowY: "auto",
  marginBottom: "10px",
};

const userMessageStyle = {
  textAlign: "right",
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "8px",
  margin: "5px",
  borderRadius: "5px",
};

const botMessageStyle = {
  textAlign: "left",
  backgroundColor: "#eee",
  padding: "8px",
  margin: "5px",
  borderRadius: "5px",
};

const toggleButtonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
};

const buttonStyle = {
  marginTop: "5px",
  width: "100%",
  padding: "8px",
};

export default Chatbot;
