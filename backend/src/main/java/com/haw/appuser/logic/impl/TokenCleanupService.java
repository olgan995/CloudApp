package com.haw.appuser.logic.impl;

import com.haw.appuser.dataaccess.api.repo.InvalidTokenRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class TokenCleanupService {

    private final InvalidTokenRepository invalidTokenRepository;

    public TokenCleanupService(InvalidTokenRepository invalidTokenRepository) {
        this.invalidTokenRepository = invalidTokenRepository;
    }


    /**
     * Method is scheduled to run every day at midnight.
     * It calculates the expiration time (24 hours ago) and uses the deleteByInvalidationTimeBefore method
     * from the repository to delete tokens that have been invalidated before the calculated expiration time
     */
    @Scheduled(cron = "0 0 0 * * ?") // Run every day at midnight
    public void cleanupExpiredTokens() {
        // Calculate expiration time (25 hours ago)
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, -25);

        // Retrieve and delete expired tokens
        Date expirationTime = calendar.getTime();
        invalidTokenRepository.deleteByInvalidationTimeBefore(expirationTime);

    }
}
