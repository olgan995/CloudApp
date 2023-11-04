package com.haw.appuser.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;

import javax.persistence.Embeddable;

/**
 * Class uses the BCrypt library to hash passwords and check if a given input matches the hashed password. It also ensures that the password is not null or empty when it is created.
 */


// this represents an immutable datatype (no setter)
@Getter
@NoArgsConstructor
@Embeddable
public class Password {

    private String passValue;

    public Password(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        this.passValue = value;
    }
}
