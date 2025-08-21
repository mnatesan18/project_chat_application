import React, { useEffect, useRef } from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage, socket }) => {
  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);

    // Emit typing event
    socket.emit("typing");

    // Clear old timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // After 1.5s of no typing, send stopTyping
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping");
    }, 1500);
  };

  return (
    <form className="form" onSubmit={sendMessage}>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button className="sendButton" type="submit">
        Send
      </button>
    </form>
  );
};

export default Input;
