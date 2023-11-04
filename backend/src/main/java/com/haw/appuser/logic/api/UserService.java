package com.haw.appuser.logic.api;

import com.haw.appuser.common.dto.AppUserDto;
import com.haw.appuser.common.exceptions.*;
import com.haw.appuser.dataaccess.api.entity.AppUser;


import java.util.List;

/**
 * Defines basic functionality for {@link AppUser} entities.
 * @author Arne Busch
 */
public interface UserService {

    /**
     * Returns a List of all User entities.
     * @return a List of all User entities
     */
    List<AppUser> findAllUsers();


    /**
     * Saves the given AppUserDto as a new User entity.
     *
     * @param appUserDto the AppUserDto to save as a new User entity
     * @return the newly created AppUser entity
     * @throws UserAlreadyExistsException if a User entity already exists with the given username or email
     */
    AppUser saveUser(AppUserDto appUserDto) throws UserAlreadyExistsException;


    /**
     * Returns the user with the given id number.
     * @param userID the user's Ids; must not be <code>null</code>
     * @return the found user
     * @throws UserNotFoundByIdException in case the user could not be found
     */
    AppUser getUserById(Long userID) throws UserNotFoundByIdException;


    /**
     * Returns user with the given username
     * @param username the user's username provided during registration
     * @return the found user
     * @throws UserNotFoundByIdException in case the user could not be found
     */
    AppUser getUserByUsername(String username) throws UserNotFoundByIdException, UserNotFoundByUsernameException;



    /**
     * Deletes user by Id.
     * @param id the users's userID; must not be <code>null</code>
     * @throws UserNotFoundByIdException in case the user could not be found
     */
    void deleteUser(Long id) throws UserNotFoundByIdException;


    /**
     *  Returns user by email.
     * @param email of the user
     * @return the found user
     * @throws UserNotFoundByUsernameException in case the user could not be found
     */
    AppUser getUserByEmail(String email) throws UserNotFoundByUsernameException, UserNotFoundByEmailException;


    /**
     * Method will update username and/or email.
     * @param userId of the user
     * @param username of the user
     * @param email of the user
     * @throws UserNotFoundByIdException
     * @throws EmailAlreadyRegisteredException
     */
    void updateUser(Long userId, String username, String email) throws UserNotFoundByIdException, EmailAlreadyRegisteredException;



}
