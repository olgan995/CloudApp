package com.haw.task.dataaccess.api.entity;

import com.haw.appuser.dataaccess.api.entity.AppUser;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Data // generates constructors, getters and more
@NoArgsConstructor(force = true) // generates a default constructor (required by Hibernate)
@AllArgsConstructor // generates a constructor for all fields
@Builder

//@RequiredArgsConstructor // generates a constructor for required (i.e. final and @NonNull) fields

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE) // prevents generation of a public setter for this field by Lombok
    private Long id;


    private String taskName;
    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    private boolean completed;
    private Long ownerId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user; // Beziehung zur Benutzerentität

    public Task(String taskName, String description, Date dueDate, boolean completed, Long ownerId, AppUser user) {
        this.taskName = taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
        this.ownerId = ownerId;
        this.user = user;
    }

    // Konstruktor, Getter und Setter
}
