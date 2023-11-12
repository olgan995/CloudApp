package com.haw.task.common;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Value
@EqualsAndHashCode(callSuper=false)
public class TaskNotFoundException extends Exception{

    Long id;
    public TaskNotFoundException(Long id) {
        super(String.format("Could not task with ID: %d.",id ));
        this.id = id;
    }

    public int getStatusCode() {
        return HttpStatus.NOT_FOUND.value();
    }
}
