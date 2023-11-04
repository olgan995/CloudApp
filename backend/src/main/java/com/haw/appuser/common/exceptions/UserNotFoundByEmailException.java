package com.haw.appuser.common.exceptions;

import org.springframework.http.HttpStatus;

public class UserNotFoundByEmailException extends Exception{
    private final String email;

    public UserNotFoundByEmailException(String email) {
        super(String.format("Could not find user with Email: %s.",email ));
        this.email = email;
    }
    public int getStatusCode() {
        return HttpStatus.NOT_FOUND.value();
    }
}
