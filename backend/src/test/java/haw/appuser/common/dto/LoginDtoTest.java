package haw.appuser.common.dto;
import com.haw.appuser.common.dto.LoginDto;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginDtoTest {

    @Test
    public void testGettersAndSetters() {

        LoginDto loginDto = new LoginDto();

        loginDto.setUsername("testUser");
        loginDto.setPassword("password");

        assertThat(loginDto.getUsername()).isEqualTo("testUser");
        assertThat(loginDto.getPassword()).isEqualTo("password");
    }

}
