package haw.appuser.common.dto;

import com.haw.appuser.common.dto.RegisterDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RegisterDtoTest {
    @Test
    void testBuilder() {
        RegisterDto registerDto = RegisterDto.builder()
                .username("testUser")
                .email("test@example.com")
                .password("testPassword")
                .build();

        assertEquals("testUser", registerDto.getUsername());
        assertEquals("test@example.com", registerDto.getEmail());
        assertEquals("testPassword", registerDto.getPassword());
    }

    @Test
    void testNoArgsConstructor() {
        RegisterDto registerDto = new RegisterDto();
        assertNotNull(registerDto);
        assertNull(registerDto.getEmail());
    }
}