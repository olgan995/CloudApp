package haw.appuser.common.dto;
import com.haw.appuser.common.dto.AppUserDto;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class AppUserDtoTest {

    @Test
    public void testGettersAndSetters() {
        AppUserDto appUserDto = new AppUserDto();

        appUserDto.setUsername("testUser");
        appUserDto.setEmail("test@example.com");
        appUserDto.setPassword("password");
        appUserDto.setRole("USER");

        assertThat(appUserDto.getUsername()).isEqualTo("testUser");
        assertThat(appUserDto.getEmail()).isEqualTo("test@example.com");
        assertThat(appUserDto.getPassword()).isEqualTo("password");
        assertThat(appUserDto.getRole()).isEqualTo("USER");
    }
}
