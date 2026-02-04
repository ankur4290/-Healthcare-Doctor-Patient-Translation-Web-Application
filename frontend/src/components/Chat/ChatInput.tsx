"use client";

import React from "react";
import { Mic, Send, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    sendMessage: () => void;
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    inputText,
    setInputText,
    sendMessage,
    isRecording,
    startRecording,
    stopRecording,
    placeholder = "Type your message..."
}) => {
    return (
        <div className="p-6 bg-white border-t border-gray-100 flex items-center gap-4 relative">
            <AnimatePresence>
                {isRecording && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-2"
                    >
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        RECORDING LIVE AUDIO
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording}
                className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                    isRecording
                        ? "bg-red-500 text-white scale-110 shadow-red-200 shadow-xl"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
                title="Hold to record audio"
            >
                {isRecording ? <Square size={20} /> : <Mic size={20} />}
            </button>

            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={isRecording ? "Listening..." : placeholder}
                disabled={isRecording}
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
            />

            <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isRecording}
                className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
                <Send size={20} />
            </button>
        </div>
    );
};
