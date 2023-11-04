package com.haw.task.dataaccess.api.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
}
