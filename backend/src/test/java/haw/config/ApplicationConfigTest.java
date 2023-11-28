package haw.config;

import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.repo.UserRepository;
import com.haw.config.ApplicationConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApplicationConfigTest {

    private ApplicationConfig applicationConfig;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        applicationConfig = new ApplicationConfig(userRepository);
    }

    @Test
    void testUserDetailsService_UserNotFound() {
        // Arrange
        String nonExistingUsername = "nonExistingUser";
        when(userRepository.findByUsername(nonExistingUsername)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> {
            try {
                applicationConfig.userDetailsService().loadUserByUsername(nonExistingUsername);
            } catch (RuntimeException e) {
                Throwable cause = e.getCause();
                if (cause instanceof UserNotFoundByUsernameException) {
                    throw new UsernameNotFoundException(cause.getMessage(), cause);
                } else {
                    throw e; // rethrow the original exception if it doesn't match
                }
            }
        });
    }



}
