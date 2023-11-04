package com.haw.appuser.logic.impl;

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
import com.haw.appuser.logic.api.AuthenticationService;
import com.haw.config.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@AllArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterDto registerDto) throws EmailAlreadyRegisteredException,
            UserAlreadyExistsException {

        if(userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            throw new EmailAlreadyRegisteredException(userRepository
                    .findByEmail(registerDto.getEmail()).get().getEmail());
        }

        if(userRepository.findByUsername(registerDto.getUsername()).isPresent()){
            throw new UserAlreadyExistsException(userRepository
                    .findByUsername(registerDto.getUsername()).get().getEmail());
        }

        var user = AppUser
                .builder()
                .username(registerDto.getUsername())
                .email(registerDto.getEmail())
                .password(new Password(passwordEncoder.encode(registerDto.getPassword())))
                .role(Role.USER)
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .name(user.getUsername())
                .build();
    }

    public AuthenticationResponse authenticate(LoginDto loginDto) throws UserNotFoundByUsernameException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        var user = userRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(()-> new UserNotFoundByUsernameException(loginDto.getUsername()));


        var jwtToken = jwtService.generateToken(user);
        AuthenticationResponse response = new AuthenticationResponse();
        response.setToken(jwtToken);
        response.setUserId(user.getId()); // Set the appropriate user ID
        response.setName(user.getUsername()); // Set the appropriate user name
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .name(user.getUsername())
                .build();
    }
}
