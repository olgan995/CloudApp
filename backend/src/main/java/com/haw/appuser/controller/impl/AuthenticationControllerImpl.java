package com.haw.appuser.controller.impl;


import com.haw.appuser.common.dto.LoginDto;
import com.haw.appuser.common.dto.RegisterDto;
import com.haw.appuser.common.exceptions.EmailAlreadyRegisteredException;
import com.haw.appuser.common.exceptions.InvalidRegistrationException;
import com.haw.appuser.common.exceptions.UserAlreadyExistsException;
import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.controller.api.AuthenticationController;
import com.haw.appuser.logic.impl.AuthenticationServiceImpl;
import com.haw.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationControllerImpl implements AuthenticationController {

    private final AuthenticationServiceImpl service;
    private final JwtService jwtService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterDto registerDto) throws
            EmailAlreadyRegisteredException, InvalidRegistrationException, UserAlreadyExistsException {

            if (registerDto.getUsername() == null || registerDto.getEmail() == null || registerDto.getPassword() == null
                    || registerDto.getUsername().isEmpty() || registerDto.getEmail().isEmpty()
                    || registerDto.getPassword().isEmpty()) {
                throw new InvalidRegistrationException();
            }

            return ResponseEntity.ok(service.register(registerDto));

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate (@RequestBody LoginDto loginDto)
            throws UserNotFoundByUsernameException {
        if (loginDto.getUsername() == null || loginDto.getPassword() == null
                ||loginDto.getUsername().isEmpty() || loginDto.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(service.authenticate(loginDto));
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);

        if (token != null) {
            jwtService.invalidateToken(token);
        }
        return ResponseEntity.ok("Logged out successfully");    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        return request.getHeader("Authorization").replace("Bearer ", "");
    }


    @ExceptionHandler(UserNotFoundByUsernameException.class)
    private ResponseEntity<String> handleUserNotFoundByUsernameException(UserNotFoundByUsernameException ex) {
        int statusCode = HttpStatus.UNAUTHORIZED.value();
        String errorMessage = ex.getMessage();;
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    private ResponseEntity<String> handleEmailAlreadyRegisteredException(EmailAlreadyRegisteredException ex) {
        int statusCode = ex.getStatusCode();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    private ResponseEntity<String> handleUsernameAlreadyExistsException(UserAlreadyExistsException ex) {
        int statusCode = ex.getStatusCode();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

    @ExceptionHandler(InvalidRegistrationException.class)
    private ResponseEntity<String> handleInvalidRegistrationException(InvalidRegistrationException ex) {
        int statusCode = ex.getStatusCode();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

}
