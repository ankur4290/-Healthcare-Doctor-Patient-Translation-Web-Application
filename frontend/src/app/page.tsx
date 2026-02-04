"use client";

import { useRef, useEffect } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { ChatBubble } from "@/components/Chat/ChatBubble";
import { ChatInput } from "@/components/Chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { Sparkles, Activity, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

/**
 * Main application entry point. 
 * I used a flex layout to keep the sidebar and chat area stable.
 */
export default function Home() {
    const {
        conversationId,
        messages,
        role,
        setRole,
        doctorLang,
        setDoctorLang,
        patientLang,
        setPatientLang,
        inputText,
        setInputText,
        isRecording,
        summary,
        setSummary,
        isSummarizing,
        searchQuery,
        setSearchQuery,
        startNewConversation,
        sendMessage,
        startRecording,
        stopRecording,
        handleSearch,
        summarizeConversation
    } = useChat();

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect to keep the latest messages in view
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <main className="flex h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
            {/* Global toast notifications */}
            <Toaster position="top-center" reverseOrder={false} />

            <Sidebar
                currentRole={role}
                setRole={setRole}
                doctorLang={doctorLang}
                setDoctorLang={setDoctorLang}
                patientLang={patientLang}
                setPatientLang={setPatientLang}
                startNewConversation={startNewConversation}
                isSessionActive={!!conversationId}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                summarizeConversation={summarizeConversation}
                isSummarizing={isSummarizing}
            />

            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                {/* Clean Header area */}
                <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${conversationId ? "bg-emerald-500" : "bg-gray-300"} animate-pulse`} />
                        <div>
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                {conversationId ? "Communication Channel" : "Standby"}
                            </h2>
                            <p className="text-[10px] text-gray-400 font-bold">
                                {conversationId ? `SESSION: ${conversationId.slice(0, 8)}` : "Ready to establish bridge"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-gray-300">
                        <Activity size={18} />
                    </div>
                </header>

                {/* Main Chat Scroll Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {messages.length === 0 && !conversationId ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6"
                                >
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                        <Languages size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight">Medical Translation Bridge</h3>
                                </motion.div>
                            ) : (
                                messages.map((msg) => (
                                    <ChatBubble key={msg.id} msg={msg} currentRole={role} />
                                ))
                            )}
                        </AnimatePresence>

                        {/* Summary Display Box */}
                        {summary && (
                            <div className="my-6 p-6 bg-gray-50 border border-gray-200 rounded-xl relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Conversation Summary</h3>
                                    <button
                                        onClick={() => setSummary(null)}
                                        className="text-gray-400 hover:text-gray-600 text-xs font-bold transition-colors"
                                    >
                                        DISMISS
                                    </button>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap font-medium">
                                    {summary}
                                </p>
                            </div>
                        )}
                        <div ref={chatEndRef} className="h-4" />
                    </div>
                </div>

                {/* Input Controls - only visible if a session is active */}
                {conversationId && (
                    <div className="max-w-4xl mx-auto w-full mb-6 px-8">
                        <ChatInput
                            inputText={inputText}
                            setInputText={setInputText}
                            sendMessage={sendMessage}
                            isRecording={isRecording}
                            startRecording={startRecording}
                            stopRecording={stopRecording}
                            placeholder={role === "DOCTOR" ? "Enter clinical query..." : "Explain how you feel..."}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
