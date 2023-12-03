package com.haw.task.logic.impl;


import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionResult;

import com.google.protobuf.ByteString;
import java.io.IOException;
import com.haw.config.SecretManagerService;
import org.springframework.stereotype.Service;


@Service
public class SpeechToTextService {

    private final String apiKey;
    private final SecretManagerService secretManagerService = new SecretManagerService();


    public SpeechToTextService() throws IOException {
        this.apiKey = secretManagerService.getApiKeyJson();
    }

    public String transcribe(byte[] audioData) throws IOException {
        try (SpeechClient speechClient = SpeechClient.create()) {
            // Create ByteString from the byte array
            ByteString audioBytes = ByteString.copyFrom(audioData);

            // Configure the audio settings
            RecognitionConfig config =
                    RecognitionConfig.newBuilder()
                            .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                            //.setSampleRateHertz(16000)
                            .setLanguageCode("en-US")
                            .build();

            RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();

            // Perform the transcription
            RecognizeResponse response = speechClient.recognize(config, audio);

            // Process the transcription result
            SpeechRecognitionResult result = response.getResults(0);
            return result.getAlternatives(0).getTranscript();
        }
    }
}
