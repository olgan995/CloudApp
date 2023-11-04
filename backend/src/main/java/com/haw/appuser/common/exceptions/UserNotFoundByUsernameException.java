package com.haw.appuser.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserNotFoundByUsernameException extends Exception{
    private final String username;

    public UserNotFoundByUsernameException(String username) {
        super(String.format("Could not find user with Username: %s.",username ));
        this.username = username;
    }

    public int getStatusCode() {
        return HttpStatus.UNAUTHORIZED.value();
    }
}
