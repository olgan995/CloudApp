package haw.appuser.logic.impl;

import com.haw.appuser.common.Password;
import com.haw.appuser.common.dto.AppUserDto;
import com.haw.appuser.common.exceptions.*;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.repo.UserRepository;
import com.haw.appuser.logic.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceImplTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userService = new UserServiceImpl(userRepository, passwordEncoder);
    }

    @Test
    void testFindAllUsers_NoUsers_ReturnsEmptyList() {
        when(userRepository.findAll()).thenReturn(new ArrayList<>());

        List<AppUser> users = userService.findAllUsers();

        assertNotNull(users);
        assertTrue(users.isEmpty());
    }


    @Test
    public void testSaveUser_UserWithEmailAlreadyExists_ThrowsException() {
        // Arrange
        AppUserDto existingUserDto = new AppUserDto();
        existingUserDto.setEmail("existingEmail@domain.com");
        existingUserDto.setUsername("existingUsername");
        existingUserDto.setPassword("password");
        existingUserDto.setRole("USER");

        when(userRepository.findByEmail(existingUserDto.getEmail())).thenReturn(Optional.of(new AppUser()));
 assertThrows(UserAlreadyExistsException.class, () -> {
            userService.saveUser(existingUserDto);
        });
    }
    @Test
    void testSaveUser_UserDoesNotExist_UserSavedSuccessfully() throws UserAlreadyExistsException {
        AppUserDto appUserDto = new AppUserDto();
        appUserDto.setEmail("test@example.com");
        appUserDto.setUsername("testUser");
        appUserDto.setPassword("password");
        appUserDto.setRole("USER");

        when(userRepository.findByEmail(appUserDto.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(appUserDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(new AppUser());

        AppUser savedUser = userService.saveUser(appUserDto);

        assertNotNull(savedUser);
        // Additional assertions based on the saved user
    }

    @Test
    void testGetUserById_UserExists_ReturnsUser() throws UserNotFoundByIdException {
        long userId = 1L;
        AppUser expectedUser = new AppUser();
        expectedUser.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));

        AppUser retrievedUser = userService.getUserById(userId);

        assertNotNull(retrievedUser);
        assertEquals(userId, retrievedUser.getId());
    }

    @Test
    void testGetUserById_UserDoesNotExist_ThrowsException() {
        long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundByIdException.class, () -> userService.getUserById(userId));
    }
    @Test
    void testGetUserByUsername_UserExists_ReturnsUser() throws UserNotFoundByUsernameException {
        String username = "testUser";
        AppUser expectedUser = new AppUser();
        expectedUser.setUsername(username);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expectedUser));

        AppUser retrievedUser = userService.getUserByUsername(username);

        assertNotNull(retrievedUser);
        assertEquals(username, retrievedUser.getUsername());
    }

    @Test
    void testGetUserByUsername_UserDoesNotExist_ThrowsException() {
        String username = "nonExistentUser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundByUsernameException.class, () -> userService.getUserByUsername(username));
    }
    @Test
    void testDeleteUser_UserExists_DeletesUser() {
        long userId = 1L;
        AppUser existingUser = new AppUser();
        existingUser.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        assertDoesNotThrow(() -> userService.deleteUser(userId));
        verify(userRepository, times(1)).delete(existingUser);
    }

    @Test
    void testDeleteUser_UserDoesNotExist_ThrowsException() {
        long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundByIdException.class, () -> userService.deleteUser(userId));
    }

    @Test
    public void testUpdateUser_ExistingEmail_ThrowsException() throws UserNotFoundByIdException {
        // Arrange
        AppUser existingUser = new AppUser("username1", "existingEmail@domain.com", new Password("password"));
        when(userRepository.findById(existingUser.getId())).thenReturn(Optional.of(existingUser));
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new AppUser()));

        // Act & Assert
        EmailAlreadyRegisteredException exception = assertThrows(EmailAlreadyRegisteredException.class, () -> {
            userService.updateUser(existingUser.getId(), null, "newEmail@domain.com");
        });
        assertEquals("newEmail@domain.com", exception.getEmail());
    }
    @Test
    void testGetUserByEmail_UserNotFound() {
        // Arrange
        String nonExistingEmail = "nonExistingEmail@domain.com";
        when(userRepository.findByEmail(nonExistingEmail)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundByEmailException.class, () -> userService.getUserByEmail(nonExistingEmail));
    }


}