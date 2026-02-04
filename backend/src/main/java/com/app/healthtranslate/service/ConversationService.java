package com.app.healthtranslate.service;

import com.app.healthtranslate.model.Conversation;
import com.app.healthtranslate.model.Message;
import com.app.healthtranslate.model.SenderRole;
import com.app.healthtranslate.repository.ConversationRepository;
import com.app.healthtranslate.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final AIService aiService;

    public Conversation createConversation(String doctorLang, String patientLang) {
        Conversation conv = Conversation.builder()
                .doctorLanguage(doctorLang)
                .patientLanguage(patientLang)
                .build();
        return conversationRepository.save(conv);
    }

    public Conversation getConversation(UUID id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
    }

    @Transactional
    public Message addTextMessage(UUID conversationId, SenderRole senderRole, String text) {
        Conversation conv = getConversation(conversationId);

        String sourceLang = (senderRole == SenderRole.DOCTOR) ? conv.getDoctorLanguage() : conv.getPatientLanguage();
        String targetLang = (senderRole == SenderRole.DOCTOR) ? conv.getPatientLanguage() : conv.getDoctorLanguage();

        String translated = aiService.translate(text, sourceLang, targetLang);

        Message message = Message.builder()
                .conversation(conv)
                .senderRole(senderRole)
                .originalText(text)
                .translatedText(translated)
                .build();

        return messageRepository.save(message);
    }

    @Transactional
    public Message addAudioMessage(UUID conversationId, SenderRole senderRole, String audioUrl) {
        Conversation conv = getConversation(conversationId);
        Message message = Message.builder()
                .conversation(conv)
                .senderRole(senderRole)
                .audioUrl(audioUrl)
                .build();
        return messageRepository.save(message);
    }

    public List<Message> getMessages(UUID conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }

    public List<Message> searchMessages(String query) {
        return messageRepository.findByOriginalTextContainingIgnoreCaseOrTranslatedTextContainingIgnoreCase(query,
                query);
    }

    public String getSummary(UUID conversationId) {
        List<Message> messages = getMessages(conversationId);
        return aiService.generateSummary(messages);
    }
}
