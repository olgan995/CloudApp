package com.haw.task.common;

import org.springframework.http.HttpStatus;

public class ForbiddenOperationException extends Exception {
    public ForbiddenOperationException(String s) {
        super(String.format(s));
    }

    public int getStatusCode() {
        return HttpStatus.FORBIDDEN.value();
    }
}
