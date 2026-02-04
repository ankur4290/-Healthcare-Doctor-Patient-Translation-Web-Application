"use client";

import { useState, useEffect, useRef } from "react";
import { Message, SenderRole, SummaryResponse } from "@/types";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Main hook to handle all chat logic, voice recording, and AI interactions.
 * I extracted this for better organization as the UI got more complex.
 */
export const useChat = () => {
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [role, setRole] = useState<SenderRole>("DOCTOR");
    const [doctorLang, setDoctorLang] = useState("English");
    const [patientLang, setPatientLang] = useState("Hindi");
    const [inputText, setInputText] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Refs for handling the microphone stream without triggering re-renders
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startNewConversation = async () => {
        try {
            const res = await fetch(`${API_BASE}/conversations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ doctorLanguage: doctorLang, patientLanguage: patientLang }),
            });
            if (!res.ok) throw new Error("API Offline");
            const data = await res.json();
            setConversationId(data.id);
            setMessages([]);
            setSummary(null);
            toast.success("Medical bridge ready");
        } catch (err) {
            toast.error("Couldn't start session - check backend connection");
        }
    };

    const sendMessage = async () => {
        if (!inputText.trim() || !conversationId) return;

        try {
            const res = await fetch(`${API_BASE}/messages/text`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    conversationId,
                    senderRole: role,
                    text: inputText,
                }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, data]);
            setInputText(""); // Clear input after successful send
        } catch (err) {
            toast.error("Message failed to send");
        }
    };

    // Microphone logic using browser MediaRecorder API
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                await uploadAudioFile(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            toast.error("Microphone check failed - check permissions");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            // Clean up the mic tracks immediately
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
        }
    };

    const uploadAudioFile = async (blob: Blob) => {
        if (!conversationId) return;
        const formData = new FormData();
        formData.append("file", blob, "message.webm");
        formData.append("conversationId", conversationId);
        formData.append("senderRole", role);

        try {
            toast.loading("Sending voice...", { id: "audio-upload" });
            const res = await fetch(`${API_BASE}/messages/audio`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setMessages((prev) => [...prev, data]);
            toast.success("Voice sent", { id: "audio-upload" });
        } catch (err) {
            toast.error("Audio failed to process", { id: "audio-upload" });
        }
    };

    const performSearch = async () => {
        if (!searchQuery.trim()) return;
        try {
            const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(searchQuery)}`);
            const results = await res.json();
            setMessages(results);
            setConversationId(null); // Deselect current conversation for search view
            toast(`Found ${results.length} matches`, { icon: '🔍' });
        } catch (err) {
            toast.error("Search failed");
        }
    };

    const generateAISummary = async () => {
        if (!conversationId) return;
        setIsSummarizing(true);
        try {
            const res = await fetch(`${API_BASE}/summary/${conversationId}`, { method: "POST" });
            const data: SummaryResponse = await res.json();
            setSummary(data.summary);
            toast.success("Medical summary generated");
        } catch (err) {
            toast.error("Summary engine failed");
        } finally {
            setIsSummarizing(false);
        }
    };

    return {
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
        handleSearch: performSearch,
        summarizeConversation: generateAISummary
    };
};
