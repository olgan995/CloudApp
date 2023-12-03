package com.haw.config;
import com.google.cloud.secretmanager.v1.AccessSecretVersionRequest;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretPayload;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@Configuration
public class SecretManagerService {

    @Bean
    public String getApiKeyJson() throws IOException {
        try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
            String secretVersionName = "projects/703260471413/secrets/SPEECH_TO_TEXT_API_KEY_JSON/versions/1";
            AccessSecretVersionRequest request =
                    AccessSecretVersionRequest.newBuilder().setName(secretVersionName).build();
            SecretPayload payload = client.accessSecretVersion(request).getPayload();
            return payload.getData().toStringUtf8();
        }
    }
}

