"use client";

import React from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Message, SenderRole } from "@/types";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
    msg: Message;
    currentRole: SenderRole;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ msg, currentRole }) => {
    const isSender = msg.senderRole === currentRole;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
                "flex flex-col mb-4",
                isSender ? "items-end" : "items-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[75%] rounded-2xl p-4 shadow-md transition-all duration-300",
                    msg.senderRole === "DOCTOR"
                        ? "bg-blue-600 text-white rounded-tr-none hover:bg-blue-700"
                        : "bg-emerald-600 text-white rounded-tl-none hover:bg-emerald-700"
                )}
            >
                {msg.audioUrl ? (
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full animate-pulse">
                            <Play size={20} className="fill-current" />
                        </div>
                        <audio
                            controls
                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${msg.audioUrl}`}
                            className="h-8 max-w-[200px]"
                        />
                    </div>
                ) : (
                    <>
                        <p className="text-base font-medium leading-relaxed mb-1">
                            {isSender ? msg.originalText : (msg.translatedText || msg.originalText)}
                        </p>
                        <div className="text-[11px] opacity-80 border-t border-white/20 pt-1 mt-2 flex justify-between items-center gap-4">
                            <span>{isSender ? (msg.translatedText ? `Hint: ${msg.translatedText}` : "Translating...") : `Original: ${msg.originalText}`}</span>
                        </div>
                    </>
                )}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                {msg.senderRole} • {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </motion.div>
    );
};
