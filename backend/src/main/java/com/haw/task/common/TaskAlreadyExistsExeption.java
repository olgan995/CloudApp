package com.haw.task.common;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Value
@EqualsAndHashCode(callSuper=false)
@ResponseStatus(HttpStatus.CONFLICT)
public class TaskAlreadyExistsExeption extends Exception{

    String name;

    public TaskAlreadyExistsExeption(String name) {
        super(String.format("Category %s already exists.",name));
        this.name = name;
    }
    public int getStatusCode() {
        return HttpStatus.CONFLICT.value();
    }
}

