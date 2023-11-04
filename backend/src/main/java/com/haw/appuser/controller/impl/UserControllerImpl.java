package com.haw.appuser.controller.impl;

import com.haw.appuser.common.dto.AppUserDto;
import com.haw.appuser.common.exceptions.*;
import com.haw.appuser.controller.api.UserController;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.logic.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/users")
public class UserControllerImpl implements UserController {


    private final UserServiceImpl userService;


    @Autowired
    public UserControllerImpl(UserServiceImpl userService) {
        this.userService = userService;
    }


    //create new user
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public AppUser createUser(@RequestBody AppUserDto appUserDto) throws UserAlreadyExistsException {
        return userService.saveUser(appUserDto);
    }


    //get all users
    @Override
    @GetMapping()
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> allUsers = userService.findAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    //get user by id
    @GetMapping("/{id:[\\d]+}")
    public ResponseEntity<AppUser> getUserById(@PathVariable Long id) throws UserNotFoundByIdException {
        AppUser user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }


    //get user by username
    //http://localhost:8080/users/username?username=DummyUser1
    @GetMapping("/username")
    public ResponseEntity<AppUser> getUserByUsername(@RequestParam String username) throws  UserNotFoundByUsernameException {
        AppUser user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    // get user by email
    //http://localhost:8080/users/email?email=test123@dummy.org
    @GetMapping("/email")
    public ResponseEntity<AppUser> getUserByEmail(@RequestParam String email) throws UserNotFoundByEmailException {
        AppUser user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    //delete user by id
    @DeleteMapping("/{id:[\\d]+}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable Long id) throws UserNotFoundByIdException {
        userService.deleteUser(id);
    }


    //edit user's email or username by id
    //http://localhost:8080/users/user?id=1
    @PutMapping("/user")
    public void updateUser(@RequestParam Long id, @RequestBody AppUserDto appUserDto) throws UserNotFoundByIdException, EmailAlreadyRegisteredException {
        userService.updateUser(id, appUserDto.getUsername(), appUserDto.getEmail());
    }


    @ExceptionHandler(UserNotFoundByIdException.class)
    private ResponseEntity<String> handleUserNotFoundByIdException(UserNotFoundByIdException ex) {
        int statusCode = ex.getStatusCode();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

    @ExceptionHandler(UserNotFoundByUsernameException.class)
    private ResponseEntity<String> handleUserNotFoundByUsernameException(UserNotFoundByUsernameException ex) {
        int statusCode = ex.getStatusCode();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

    @ExceptionHandler(UserNotFoundByEmailException.class)
    private ResponseEntity<String> handleUserNotFoundByEmailException(UserNotFoundByEmailException ex) {
        int statusCode = ex.getStatusCode();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    private ResponseEntity<String> handleEmailAlreadyRegisteredException(EmailAlreadyRegisteredException ex) {
        int statusCode = HttpStatus.CONFLICT.value();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }
    @ExceptionHandler(UserAlreadyExistsException.class)
    private ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        int statusCode = HttpStatus.CONFLICT.value();
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(statusCode).body(errorMessage);
    }

}

