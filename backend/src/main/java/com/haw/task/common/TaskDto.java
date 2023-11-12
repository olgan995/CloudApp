package com.haw.task.common;

import lombok.Data;

import java.util.Date;
@Data // generates constructors, getters and more
public class TaskDto {

    private String taskName;
    private String description;
    private Date dueDate;
    private boolean completed;

    //getters setters
}
