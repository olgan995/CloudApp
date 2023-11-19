package com.haw.appuser.dataaccess.api.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.haw.appuser.common.Password;
import com.haw.task.dataaccess.api.entity.Task;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Data // generates constructors, getters and more
@NoArgsConstructor(force = true) // generates a default constructor (required by Hibernate)
@Entity
public class InvalidToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE) // prevents generation of a public setter for this field by Lombok
    private Long tokenId;

    @Column(unique = true, nullable = false)
    private String tokenValue;

    @Column(name = "invalidation_time", nullable = false)
    private Date invalidationTime;

}
