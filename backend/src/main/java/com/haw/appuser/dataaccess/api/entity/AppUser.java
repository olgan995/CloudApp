package com.haw.appuser.dataaccess.api.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.haw.appuser.common.Password;
import com.haw.task.dataaccess.api.entity.Task;
import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import java.util.*;

/**
 * Represents a user of the application. It has properties such as an ID, username
 * (unique identifier for the user), email (email address of the user), password (hashed password of the user),
 * and a list of tasks.
 */
@Data // generates constructors, getters and more
@NoArgsConstructor(force = true) // generates a default constructor (required by Hibernate)
@AllArgsConstructor // generates a constructor for all fields
@Builder

//@RequiredArgsConstructor // generates a constructor for required (i.e. final and @NonNull) fields

@Entity
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE) // prevents generation of a public setter for this field by Lombok
    @Column(name = "user_id")
    private Long id;

    @NotNull // adds a constraint for this field (checked by Hibernate during saving)
    @Column(unique = true)
    //@NonNull // marks this field as a required field for Lombok (this info is needed in @RequiredArgsConstructor)
    private String username;

    @NotNull // adds a constraint for this field (checked by Hibernate during saving)
    //@NonNull // marks this field as a required field for Lombok (this info is needed in @RequiredArgsConstructor)
    @Size(max = 100) // adds a constraint for this field (checked by Hibernate during saving)
    @Column(unique = true) // adds a uniqueness constraint for this field's column (business key column)
    @Email (regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE)// adds a constraint for this field (checked by Hibernate during saving)
    private String email;

    @NotNull
    private Password password;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany( // this entity can have multiple children, and every child can have multiple parents
            //cascade = CascadeType.ALL, // also removes children when this entity is removed
            cascade =
            {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.REFRESH,
                    CascadeType.PERSIST
            },
            //orphanRemoval = true, // removes children after being detached from this entity without being re-attached
            fetch = FetchType.LAZY // loads all children when this entity is loaded (not only when accessing them)
    )
    @Setter(AccessLevel.NONE) // prevents generation of a public setter for this field by Lombok
    private List<Task> listOfTasks = new ArrayList<>();

    @Enumerated(EnumType.STRING)

    private Role role;


    public AppUser(String username, String email, Password password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public AppUser(String username, String email, Password password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // other fields and relationships with other entities

    public void addNewTaskToListOfTasks(Task collection) {
        //TODO
    }


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AppUser appUser = (AppUser) o;
        return Objects.equals(username, appUser.username) && Objects.equals(email, appUser.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public String getPassword(){
        return password.getPassValue();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
