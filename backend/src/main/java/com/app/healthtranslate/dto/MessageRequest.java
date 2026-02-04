package com.app.healthtranslate.dto;

import com.app.healthtranslate.model.SenderRole;
import lombok.Data;

import java.util.UUID;

@Data
public class MessageRequest {
    private UUID conversationId;
    private SenderRole senderRole;
    private String text;
}
