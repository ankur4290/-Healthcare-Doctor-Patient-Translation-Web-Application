package com.app.healthtranslate.service;

import com.app.healthtranslate.model.Message;

import java.util.List;

public interface AIService {
    String translate(String text, String sourceLang, String targetLang);

    String generateSummary(List<Message> messages);
}
