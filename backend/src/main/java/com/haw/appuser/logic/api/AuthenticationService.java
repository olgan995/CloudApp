package com.haw.appuser.logic.api;

import com.haw.appuser.common.dto.LoginDto;
import com.haw.appuser.common.dto.RegisterDto;
import com.haw.appuser.common.exceptions.EmailAlreadyRegisteredException;
import com.haw.appuser.common.exceptions.UserAlreadyExistsException;
import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.controller.impl.AuthenticationResponse;

import javax.transaction.Transactional;

@Transactional
public interface AuthenticationService {

    /**
     * Registers a new user.
     *
     * @param registerDto the registration data
     * @return the authentication response containing the generated token
     * @throws UserAlreadyExistsException if a user with the given email already exists
     */
    AuthenticationResponse register(RegisterDto registerDto) throws UserAlreadyExistsException, EmailAlreadyRegisteredException;

    /**
     * Authenticates a user.
     *
     * @param loginDto the login data
     * @return the authentication response containing the generated token, userId and name
     * @throws UserNotFoundByUsernameException if a user with the given username does not exist
     */
    AuthenticationResponse authenticate(LoginDto loginDto) throws UserNotFoundByUsernameException;

}






