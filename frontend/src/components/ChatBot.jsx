import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, User, Bot } from "lucide-react";

// Placeholder for the actual API call
const sendMessageToGemini = async (message) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Simulate a response
  return {
    text: `AI response to: "${message}". This is a simulated response.`,
    isEmergency: message.toLowerCase().includes("emergency"),
  };
};

const ChatBot = ({ onNewEmergencyData }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return;

    const userMessage = { text: inputMessage, sender: "user", timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToGemini(inputMessage); // Replace with actual API call
      const botMessage = { text: aiResponse.text, sender: "bot", timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // If the AI response indicates an emergency, update the emergency panel
      if (aiResponse.isEmergency && onNewEmergencyData) {
        // This is a placeholder for actual emergency data from Gemini
        // In a real scenario, aiResponse would contain the structured emergency data
        onNewEmergencyData({
          severity: "MEDIUM", // Example severity
          summary: aiResponse.text,
          firstAid: ["Stay calm", "Call for help"],
          dontDo: ["Panic"],
          department: "General Practice",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Could not get a response.", sender: "bot", timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto pr-2 -mr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                msg.sender === "user"
                  ? "bg-emerald-500 text-white rounded-br-none"
                  : "bg-slate-100 text-slate-800 rounded-bl-none"
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.sender === "bot" && <Bot size={16} className="mr-2 text-blue-500" />}
                <span className="font-semibold">
                  {msg.sender === "user" ? "You" : "LifeLineAI"}
                </span>
                {msg.sender === "user" && <User size={16} className="ml-2 text-white" />}
              </div>
              <p className="text-sm">{msg.text}</p>
              <span
                className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-emerald-100" : "text-slate-500"
                } self-end`}
              >
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md bg-slate-100 text-slate-800 rounded-bl-none">
              <Bot size={16} className="mr-2 text-blue-500" />
              <span className="font-semibold">LifeLineAI is typing</span>
              <Loader2 className="ml-2 h-4 w-4 animate-spin text-blue-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center space-x-3">
        <textarea
          className="flex-1 p-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none overflow-hidden text-slate-700"
          rows="1"
          placeholder="Type your emergency message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          style={{ minHeight: '48px', maxHeight: '120px' }} // Adjust as needed
        />
        <button
          className="p-3 bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === "" || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;