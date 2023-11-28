package haw.appuser.dataaccess.api.entity;

import com.haw.appuser.common.Password;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.entity.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

public class AppUserTest {
    private String username;
    private String email;
    private Password password;
    private Role adminRole;
    private Role userRole;

    @BeforeEach
    public void init() {
        username = "testUser";
        email = "test@haw-hamburg.de";
        password = new Password("DummyPassword");
        adminRole = Role.ADMIN;
        userRole = Role.USER;
    }

    @Test
    public void testAppUserCreation() {
        AppUser user = new AppUser(username, email, password, userRole);

        assertNotNull(user);
        assertEquals(username, user.getUsername());
        assertEquals(email, user.getEmail());
        assertEquals(password.getPassValue(), user.getPassword());
        assertEquals(userRole, user.getRole());
    }

    @Test
    public void testAppUserAuthorities() {
        AppUser user = new AppUser(username, email, password, adminRole);

        Collection<? extends SimpleGrantedAuthority> authorities = (Collection<? extends SimpleGrantedAuthority>) user.getAuthorities();
        assertNotNull(authorities);
        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority(adminRole.name())));
    }

}
