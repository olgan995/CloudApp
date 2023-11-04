package com.haw.appuser.controller.api;

import com.haw.appuser.common.dto.LoginDto;
import com.haw.appuser.common.dto.RegisterDto;
import com.haw.appuser.common.exceptions.EmailAlreadyRegisteredException;
import com.haw.appuser.common.exceptions.InvalidRegistrationException;
import com.haw.appuser.common.exceptions.UserAlreadyExistsException;
import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.controller.impl.AuthenticationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public interface AuthenticationController {

    /**
     * Registers a new user.
     *
     * @param registerDto the registration data
     * @return the authentication response with a generated token, userId and name
     * @throws UserAlreadyExistsException if a user with the given email already exists
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterDto registerDto)
            throws EmailAlreadyRegisteredException, InvalidRegistrationException, UserAlreadyExistsException;

    /**
     * Authenticates a user.
     *
     * @param loginDto the login data
     * @return the authentication response with a generated token, userId and name.
     * Status 403 returned if password was incorrect or password and username do not match
     * Status 401 returned if username not found
     * 400 if there is no input
     *
     * @throws UserNotFoundByUsernameException if a user with the given username does not exist
     */
    @PostMapping("/login")
    ResponseEntity<AuthenticationResponse> authenticate(@RequestBody LoginDto loginDto)
            throws UserNotFoundByUsernameException;

    /**
     * Logout
     *
     * @param request HttpServletRequest from Client
     * @return status 200 (OK)
     */

    @PostMapping("/logout")
    ResponseEntity<String> logout(HttpServletRequest request);


}