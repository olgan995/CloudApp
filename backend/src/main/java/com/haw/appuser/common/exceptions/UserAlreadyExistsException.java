package com.haw.appuser.common.exceptions;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Value
@EqualsAndHashCode(callSuper=false)
@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends Exception{
    private final String username;

    public UserAlreadyExistsException(String username) {
        super(String.format("User with username or email: %s already exists.",username ));
        this.username = username;
    }

    public int getStatusCode() {
        return HttpStatus.CONFLICT.value();
    }
}
