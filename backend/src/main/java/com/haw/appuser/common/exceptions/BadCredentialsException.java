package com.haw.appuser.common.exceptions;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@Value
@EqualsAndHashCode(callSuper=false)
@ResponseStatus(HttpStatus.UNAUTHORIZED)

public class BadCredentialsException extends AuthenticationException {

    public BadCredentialsException(String message) {
        super(message);
    }

    public int getStatusCode() {
        return HttpStatus.UNAUTHORIZED.value();
    }
}