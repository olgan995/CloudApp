package com.haw.appuser.logic.impl;

import com.haw.appuser.common.dto.AppUserDto;
import com.haw.appuser.common.Password;
import com.haw.appuser.common.exceptions.*;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.entity.Role;
import com.haw.appuser.dataaccess.api.repo.UserRepository;
import com.haw.appuser.logic.api.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService{


     // automatically initializes the field with a Spring bean of a matching type
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;



    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;

        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public List<AppUser> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public AppUser saveUser(AppUserDto appUserDto) throws UserAlreadyExistsException {

        if(userRepository.findByEmail(appUserDto.getEmail()).isPresent()){
            throw new UserAlreadyExistsException(userRepository.findByEmail(appUserDto.getEmail()).get().getEmail());
        }

        AppUser appUser = new AppUser();
        appUser.setEmail(appUserDto.getEmail());
        appUser.setUsername(appUserDto.getUsername());
        appUser.setPassword(new Password(passwordEncoder.encode(appUserDto.getPassword())));
        appUser.setRole(Role.valueOf(appUserDto.getRole().toUpperCase()));
        return userRepository.save(appUser);
    }

    public AppUser getUserById(Long id) throws UserNotFoundByIdException {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundByIdException(id));
    }

    public AppUser getUserByUsername(String username) throws UserNotFoundByUsernameException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundByUsernameException(username));
    }

    public void deleteUser(Long id) throws UserNotFoundByIdException {
       AppUser user = getUserById(id);

        userRepository.delete(user);
    }

    @Override
    public AppUser getUserByEmail(String email) throws  UserNotFoundByEmailException {
        return userRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundByEmailException(email));
    }


    @Override
    public void updateUser(Long userId, String username, String email) throws UserNotFoundByIdException, EmailAlreadyRegisteredException {

        AppUser appUserToUpdate = getUserById(userId);

        if(username != null && username.length()>0){
            appUserToUpdate.setUsername(username);
        }

        if(email!=null&& email.length()>0){
            Optional<AppUser> userByEmail = userRepository.findByEmail(email);

            if(userByEmail.isPresent()){
                throw new EmailAlreadyRegisteredException(email);
            }

            appUserToUpdate.setEmail(email);
            userRepository.save(appUserToUpdate);
        }
    }

}

