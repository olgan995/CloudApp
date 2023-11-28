package haw.appuser.controller.impl;

import com.haw.appuser.common.dto.RegisterDto;
import com.haw.appuser.common.exceptions.EmailAlreadyRegisteredException;
import com.haw.appuser.common.exceptions.InvalidRegistrationException;
import com.haw.appuser.common.exceptions.UserAlreadyExistsException;
import com.haw.appuser.controller.impl.AuthenticationControllerImpl;
import com.haw.appuser.controller.impl.AuthenticationResponse;
import com.haw.appuser.logic.impl.AuthenticationServiceImpl;
import com.haw.config.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

public class AuthenticationControllerImplTest {

    @Mock
    private AuthenticationServiceImpl service;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthenticationControllerImpl controller;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        controller = new AuthenticationControllerImpl(service, jwtService);
    }


    @Test
    public void testRegister_ValidInput_Success() throws EmailAlreadyRegisteredException, InvalidRegistrationException, UserAlreadyExistsException {
        RegisterDto registerDto = new RegisterDto("abc123", "email@haw-hamburg.de", "Dummy123password");

        ResponseEntity<AuthenticationResponse> response = controller.register(registerDto);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).register(registerDto);
    }

    @Test
    public void testRegister_InvalidInput_ThrowsException() {
        RegisterDto invalidRegisterDto = new RegisterDto(null, null, null);
        assertThrows(InvalidRegistrationException.class, () -> controller.register(invalidRegisterDto));
        try {
            verify(service, never()).register(any());
        } catch (EmailAlreadyRegisteredException | UserAlreadyExistsException e) {
            throw new RuntimeException(e);
        }

    }
}