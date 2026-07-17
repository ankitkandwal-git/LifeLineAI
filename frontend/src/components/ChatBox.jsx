import React, { useState, useEffect, useRef } from "react";
import EmergencyPanel from "./EmergencyPanel";
import { sendMessage } from "../services/chatService";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [emergencyData, setEmergencyData] = useState(null);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      isUser: true,
    };

    // Add user message to chat immediately
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);
    setInputMessage(""); // Clear input box immediately

    try {
      // Send message to backend
      const data = await sendMessage(userMessage.text);

      // Update Emergency Panel
      setEmergencyData(data);

      // Optional: Add AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          text: data.summary,
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally, add an error message to the chat
      setMessages((prev) => [
        ...prev,
        {
          text: "Oops! Something went wrong. Please try again.",
          isUser: false,
          isError: true, // Custom property to style error messages
        },
      ]);
    }
  };

  return (
    <motion.div
      className="flex flex-col max-w-6xl gap-8 p-6 mx-auto mt-8 md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Chat Section */}
      <motion.div className="flex-1 flex flex-col h-[calc(100vh-120px)] p-6 bg-white rounded-2xl shadow-xl border border-gray-100">

        {/* Messages */}
        <div className="flex-grow overflow-y-auto pr-2">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex my-3 ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl break-words ${
                  msg.isUser
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 shadow-sm"
                } ${msg.isError ? "bg-red-500 text-white" : ""}`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex mt-6">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Describe the emergency..."
            className="flex-1 p-4 border border-gray-300 rounded-l-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 text-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />

          <button
            onClick={handleSendMessage}
            className="flex items-center justify-center px-6 bg-blue-600 text-white rounded-r-2xl hover:bg-blue-700 transition-colors duration-200 ease-in-out shadow-md"
            aria-label="Send message"
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>
      </motion.div>

      {/* Emergency Panel */}
      <motion.div
        className="w-full md:w-1/3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <EmergencyPanel data={emergencyData} />
      </motion.div>
    </motion.div>
  );
};

export default ChatBox;