import React, { useState, useEffect, useRef } from "react";
import EmergencyPanel from "./EmergencyPanel";
import { sendMessage } from "../services/chatService";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, Sparkles, User, Bot } from "lucide-react";
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMessage = {
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMessage("");
    setLoading(true);

    try {
      const data = await sendMessage(text);
      setEmergencyData(data);

      setMessages((prev) => [
        ...prev,
        {
          text: data.summary,
          isUser: false,
          timestamp: new Date()
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Couldn't finish the check. Try again in a moment.",
          isUser: false,
          isError: true,
          timestamp: new Date()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { text: "Severe chest pain and shortness of breath.", label: "Chest pain" },
    { text: "Deep cut on the arm with a lot of bleeding.", label: "Heavy bleeding" },
    { text: "Signs of heat exhaustion or heat stroke.", label: "Heat issue" }
  ];

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-7xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Workspace: Chat Interface (65% width on desktop) */}
        <div className="w-full lg:w-2/3 flex flex-col h-[calc(100vh-150px)] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 dark:shadow-none">
          
          {/* Conversation Workspace */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <Sparkles size={24} />
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold text-slate-800 dark:text-white">Start here</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Type what happened and the app will give a simple response.
                  </p>
                  <p className="mt-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Or try one of these suggestions:
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt.text)}
                        className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200"
                      >
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-start gap-4 ${msg.isUser ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!msg.isUser && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex-shrink-0">
                        <Bot size={16} />
                      </div>
                    )}

                    <div
                      className={`max-w-[75%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        msg.isUser
                          ? "bg-blue-600 text-white rounded-tr-none font-medium"
                          : msg.isError
                          ? "bg-red-550 text-white rounded-tl-none font-semibold"
                          : "bg-slate-50 border border-slate-200/50 text-slate-800 rounded-tl-none dark:bg-slate-850 dark:border-slate-800 dark:text-slate-100"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.isUser && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-300 flex-shrink-0">
                        <User size={16} />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            
            {loading && (
              <div className="flex items-start gap-4 justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 text-slate-500 rounded-tl-none dark:bg-slate-850 dark:border-slate-800 flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </span>
                  <span className="text-xs">Analyzing symptoms...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
            <div className="max-w-2xl mx-auto relative flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={loading ? "Checking..." : "Type what happened..."}
                disabled={loading}
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100/60 focus:bg-white dark:focus:bg-slate-900 border border-slate-200/60 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl outline-none transition duration-205 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleSendMessage();
                  }
                }}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || loading}
                className="absolute right-2 p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-650 active:scale-95"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>

            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 sticky top-24 self-start max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-thin">
          <EmergencyPanel data={emergencyData} />
        </div>

      </div>
    </motion.div>
  );
};

export default ChatBox;