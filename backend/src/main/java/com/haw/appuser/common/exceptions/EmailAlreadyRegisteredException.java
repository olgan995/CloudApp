package com.haw.appuser.common.exceptions;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Value
@EqualsAndHashCode(callSuper=false)
@ResponseStatus(HttpStatus.CONFLICT)
public class EmailAlreadyRegisteredException extends Exception {

    private final String email;

    public EmailAlreadyRegisteredException(String email) {
        super(String.format("User with email: %s already exists.",email));
        this.email = email;
    }

    public int getStatusCode() {
        return HttpStatus.CONFLICT.value();
    }
}
