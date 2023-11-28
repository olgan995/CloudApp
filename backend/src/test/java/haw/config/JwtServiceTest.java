package haw.config;

import com.haw.appuser.dataaccess.api.entity.Role;
import com.haw.config.JwtService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService();


    @Test
    void testGenerateToken() {
        // Test generateToken method
        UserDetails userDetails = new User("username", "password", List.of(new SimpleGrantedAuthority(Role.USER.name())));
        String token = jwtService.generateToken(new HashMap<>(), userDetails);
        assertNotNull(token);
    }



    @Test
    void testIsTokenValid_InvalidUsername() {
        // Given an invalid username
        String username = "testUser";
        UserDetails userDetails = new User(username, "password", List.of(new SimpleGrantedAuthority(Role.USER.name())));
        String token = jwtService.generateToken(new HashMap<>(), userDetails);

        // When using different user details
        boolean isValid = jwtService.isTokenValid(token, new User("anotherUser", "password", List.of(new SimpleGrantedAuthority(Role.USER.name()))));

        // Then
        assertFalse(isValid);
    }



}
