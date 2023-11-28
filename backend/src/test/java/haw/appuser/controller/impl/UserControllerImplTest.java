package haw.appuser.controller.impl;

import com.haw.appuser.common.dto.AppUserDto;
import com.haw.appuser.common.exceptions.UserAlreadyExistsException;
import com.haw.appuser.controller.impl.UserControllerImpl;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.logic.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerImplTest {

    private UserServiceImpl userService;
    private UserControllerImpl userController;
    private MockMvc mockMvc;


    @BeforeEach
    void setUp() {
        userService = mock(UserServiceImpl.class);
        userController = new UserControllerImpl(userService);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testCreateUser_Success() throws UserAlreadyExistsException {
        AppUserDto appUserDto = new AppUserDto();
        when(userService.saveUser(appUserDto)).thenReturn(new AppUser());

        // When
        AppUser result = userController.createUser(appUserDto);

        verify(userService, times(1)).saveUser(appUserDto);
    }


}
