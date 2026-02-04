export type SenderRole = "DOCTOR" | "PATIENT";

export interface Message {
    id: string;
    senderRole: SenderRole;
    originalText: string;
    translatedText?: string;
    audioUrl?: string;
    createdAt: string;
}

export interface Conversation {
    id: string;
    doctorLanguage: string;
    patientLanguage: string;
    createdAt: string;
}

export interface SummaryResponse {
    summary: string;
}
