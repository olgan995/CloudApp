package com.haw.appuser.common.exceptions;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Value
@EqualsAndHashCode(callSuper=false)
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidRegistrationException extends Exception {
    public InvalidRegistrationException() {
        super("Registration data is incomplete");
    }

    public int getStatusCode() {
        return HttpStatus.BAD_REQUEST.value();
    }
}
