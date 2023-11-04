package com.haw.appuser.common.exceptions;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Value
@EqualsAndHashCode(callSuper=false)
public class UserNotFoundByIdException extends Exception {
    private final Long id;

    public UserNotFoundByIdException(Long idUser) {
        super(String.format("Could not find user with ID: %d.",idUser ));
        this.id = idUser;
    }

    public int getStatusCode() {
        return HttpStatus.NOT_FOUND.value();
    }
}
