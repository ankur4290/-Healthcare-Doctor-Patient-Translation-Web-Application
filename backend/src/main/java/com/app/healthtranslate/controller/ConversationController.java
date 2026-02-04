package com.app.healthtranslate.controller;

import com.app.healthtranslate.dto.MessageRequest;
import com.app.healthtranslate.model.Conversation;
import com.app.healthtranslate.model.Message;
import com.app.healthtranslate.model.SenderRole;
import com.app.healthtranslate.service.AudioStorageService;
import com.app.healthtranslate.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ConversationController {

    private final ConversationService conversationService;
    private final AudioStorageService audioStorageService;

    @PostMapping("/conversations")
    public ResponseEntity<Conversation> createConversation(@RequestBody Map<String, String> languages) {
        Conversation conv = conversationService.createConversation(
                languages.getOrDefault("doctorLanguage", "English"),
                languages.getOrDefault("patientLanguage", "Spanish"));
        return ResponseEntity.ok(conv);
    }

    @GetMapping("/conversations/{id}")
    public ResponseEntity<Conversation> getConversation(@PathVariable UUID id) {
        return ResponseEntity.ok(conversationService.getConversation(id));
    }

    @GetMapping("/conversations/{id}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable UUID id) {
        return ResponseEntity.ok(conversationService.getMessages(id));
    }

    @PostMapping("/messages/text")
    public ResponseEntity<Message> sendText(@RequestBody MessageRequest request) {
        Message msg = conversationService.addTextMessage(
                request.getConversationId(),
                request.getSenderRole(),
                request.getText());
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/messages/audio")
    public ResponseEntity<Message> sendAudio(
            @RequestParam("conversationId") UUID conversationId,
            @RequestParam("senderRole") SenderRole senderRole,
            @RequestParam("file") MultipartFile file) {

        String audioUrl = audioStorageService.save(file);
        Message msg = conversationService.addAudioMessage(conversationId, senderRole, audioUrl);
        return ResponseEntity.ok(msg);
    }

    @GetMapping("/audio/{filename:.+}")
    public ResponseEntity<byte[]> getAudio(@PathVariable String filename) {
        byte[] data = audioStorageService.load(filename);
        return ResponseEntity.ok()
                .header("Content-Type", "audio/webm")
                .body(data);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Message>> search(@RequestParam("query") String query) {
        return ResponseEntity.ok(conversationService.searchMessages(query));
    }

    @PostMapping("/summary/{conversationId}")
    public ResponseEntity<Map<String, String>> getSummary(@PathVariable UUID conversationId) {
        String summary = conversationService.getSummary(conversationId);
        return ResponseEntity.ok(Map.of("summary", summary));
    }
}
