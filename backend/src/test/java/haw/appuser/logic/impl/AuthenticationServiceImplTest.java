package haw.appuser.logic.impl;

import com.haw.appuser.common.Password;
import com.haw.appuser.common.dto.LoginDto;
import com.haw.appuser.common.dto.RegisterDto;
import com.haw.appuser.common.exceptions.EmailAlreadyRegisteredException;
import com.haw.appuser.common.exceptions.UserAlreadyExistsException;
import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.controller.impl.AuthenticationResponse;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.entity.Role;
import com.haw.appuser.dataaccess.api.repo.UserRepository;
import com.haw.appuser.logic.impl.AuthenticationServiceImpl;
import com.haw.config.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthenticationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        authenticationService = new AuthenticationServiceImpl(
                userRepository, jwtService, authenticationManager, passwordEncoder);
    }

    @Test
    public void testRegister_EmailAlreadyExists_ExceptionThrown() {
        RegisterDto registerDto = new RegisterDto("username1", "existingEmail@haw-hamburg.de", "Dummypassword");
        when(userRepository.findByEmail("existingEmail@haw-hamburg.de"))
                .thenReturn(Optional.of(new AppUser("username1", "existingEmail@haw-hamburg.de", new Password("Dummypassword"), Role.USER)));

        EmailAlreadyRegisteredException exception = assertThrows(EmailAlreadyRegisteredException.class,
                () -> authenticationService.register(registerDto));

        assertEquals("existingEmail@haw-hamburg.de", exception.getEmail());
        verify(userRepository, never()).findByUsername(anyString());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(AppUser.class));
    }

    @Test
    public void testAuthenticate_ValidLogin_Success() throws UserNotFoundByUsernameException {
        LoginDto loginDto = new LoginDto("existingUsername", "password");
        AppUser mockUser = new AppUser("existingUsername", "email@example.com", new Password("hashedPassword"), Role.USER);
        when(userRepository.findByUsername("existingUsername")).thenReturn(Optional.of(mockUser));

        AuthenticationResponse response = authenticationService.authenticate(loginDto);
        assertNotNull(response);
        assertThat(loginDto.getUsername()).isEqualTo("existingUsername");
        assertThat(loginDto.getPassword()).isEqualTo("password");
    }

    // Write tests for UserNotFoundByUsernameException, invalid login credentials, etc.
}
