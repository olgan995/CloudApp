package haw.appuser.common;

import com.haw.appuser.common.Password;
import com.haw.appuser.dataaccess.api.entity.Role;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PasswordTest {

    @Test
    void checkPasswordTest() {
        assertEquals("DummyPassword", new Password("DummyPassword").getPassValue());
        assertThrows(IllegalArgumentException.class, () -> new Password(""));
        assertThrows(IllegalArgumentException.class, () -> new Password(null));
    }
}