package com.haw.appuser.controller.api;

import com.haw.appuser.common.dto.AppUserDto;
import com.haw.appuser.common.exceptions.*;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserController {

    /**
     * Create a new user.
     * PATH  /users
     * @param appUserDto User data as {@link AppUserDto} object.
     * @return Created user as {@link AppUser} object.
     * @throws UserAlreadyExistsException If user with the same username or email already exists.
     */
    AppUser createUser(AppUserDto appUserDto) throws UserAlreadyExistsException;

    /**
     * Get all users.
     * PATH /users
     * @return List of all users as {@link AppUser} objects.
     */
    ResponseEntity<List<AppUser>> getAllUsers();

    /**
     * Get user by ID.
     * PATH /users/{id:[\d]+}
     * @param id User ID.
     * @return User with the given ID as {@link AppUser} object.
     */
    ResponseEntity<AppUser> getUserById(Long id) throws UserNotFoundByIdException;

    /**
     * Get user by username.
     * PATH /users/username?username=param
     * @param username User's username.
     * @return User with the given username as {@link AppUser} object.
     * @throws UserNotFoundByIdException If user with the given username not found.
     */
    ResponseEntity<AppUser> getUserByUsername(String username) throws UserNotFoundByUsernameException;

    /**
     * Get user by email.
     * PATH /users/email?email=param
     * @param email User's email.
     * @return User with the given email as {@link AppUser} object.
     * @throws UserNotFoundByUsernameException If user with the given email not found.
     */
    ResponseEntity<AppUser> getUserByEmail(String email) throws UserNotFoundByEmailException;

    /**
     * Delete user by ID.
     * /users
     * PATH /users/{id}
     * @param id User ID.
     * @throws UserNotFoundByIdException If user with the given ID not found.
     */
    void deleteUser(Long id) throws UserNotFoundByIdException;

    /**
     * Update user's email or username by ID.
     * PATH /users/user?id=userId
     * @param appUser User data as {@link AppUserDto} object and User's ID.
     * @throws UserNotFoundByIdException If user with the given ID not found.
     * @throws EmailAlreadyRegisteredException If the updated email is already registered by another user.
     */
    void updateUser(Long userId, AppUserDto appUser) throws UserNotFoundByIdException, EmailAlreadyRegisteredException;

}