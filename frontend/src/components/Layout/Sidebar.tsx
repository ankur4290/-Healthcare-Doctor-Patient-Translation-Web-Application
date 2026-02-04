"use client";

import React from "react";
import { Search, PlusCircle, Sparkles } from "lucide-react";
import { SenderRole } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Sidebar component for configuration and history.
 * Kept it simple and clean for better usability.
 */
interface SidebarProps {
    currentRole: SenderRole;
    setRole: (role: SenderRole) => void;
    doctorLang: string;
    setDoctorLang: (lang: string) => void;
    patientLang: string;
    setPatientLang: (lang: string) => void;
    startNewConversation: () => void;
    isSessionActive: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: () => void;
    summarizeConversation: () => void;
    isSummarizing: boolean;
}

const SUPPORTED_LANGUAGES = ["English", "Hindi", "Spanish", "French", "German"];

export const Sidebar: React.FC<SidebarProps> = ({
    currentRole,
    setRole,
    doctorLang,
    setDoctorLang,
    patientLang,
    setPatientLang,
    startNewConversation,
    isSessionActive,
    searchQuery,
    setSearchQuery,
    handleSearch,
    summarizeConversation,
    isSummarizing
}) => {
    return (
        <div className="w-80 bg-white border-r border-gray-100 flex flex-col h-full shadow-md z-10">
            {/* Top Logo and Action Area */}
            <div className="p-6 border-b border-gray-50 bg-gradient-to-br from-blue-50/50 to-transparent">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-100 shadow-lg">
                        <Sparkles size={20} />
                    </div>
                    <h1 className="font-extrabold text-gray-900 leading-tight tracking-tight text-lg">HealthTranslate</h1>
                </div>

                <button
                    onClick={startNewConversation}
                    className={cn(
                        "w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all duration-500",
                        isSessionActive
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg active:scale-95"
                    )}
                >
                    {isSessionActive ? (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Session Live
                        </div>
                    ) : (
                        <>
                            <PlusCircle size={20} />
                            Start New Bridge
                        </>
                    )}
                </button>
            </div>

            {/* Config & Search scrollable area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <section>
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Who are you?</label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl">
                        <button
                            onClick={() => setRole("DOCTOR")}
                            className={cn(
                                "py-2 rounded-lg text-sm font-bold transition-all",
                                currentRole === "DOCTOR" ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            Doctor
                        </button>
                        <button
                            onClick={() => setRole("PATIENT")}
                            className={cn(
                                "py-2 rounded-lg text-sm font-bold transition-all",
                                currentRole === "PATIENT" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            Patient
                        </button>
                    </div>
                </section>

                <section className="space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] block">Languages</label>
                    <div className="space-y-3">
                        <div className="group">
                            <span className="text-[9px] text-gray-400 font-bold mb-1 block uppercase">Doctor Side</span>
                            <select
                                value={doctorLang}
                                onChange={(e) => setDoctorLang(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-xl text-sm font-semibold p-3 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            >
                                {SUPPORTED_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="group">
                            <span className="text-[9px] text-gray-400 font-bold mb-1 block uppercase">Patient Side</span>
                            <select
                                value={patientLang}
                                onChange={(e) => setPatientLang(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-xl text-sm font-semibold p-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            >
                                {SUPPORTED_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Find Conversations</label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Type keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                    </div>
                </section>

                <button
                    onClick={summarizeConversation}
                    disabled={!isSessionActive || isSummarizing}
                    className="w-full py-4 px-6 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100 font-bold flex items-center justify-center gap-3 hover:bg-amber-100 transition-all disabled:opacity-30 active:scale-95 group"
                >
                    <Sparkles size={18} className={cn(isSummarizing && "animate-spin")} />
                    {isSummarizing ? "Processing..." : "Get AI Summary"}
                </button>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-50 text-center">
                <span className="text-[9px] text-gray-400 font-mono font-bold tracking-tight uppercase">Medical Translation System</span>
            </div>
        </div>
    );
};
