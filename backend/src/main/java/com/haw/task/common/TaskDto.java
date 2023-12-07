package com.haw.task.common;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;
@Data // generates constructors, getters and more
public class TaskDto {

    private String taskName;
    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    private boolean completed;
    //getters setters
}
