package haw.task.impl;
import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.repo.UserRepository;
import com.haw.task.common.ForbiddenOperationException;
import com.haw.task.common.TaskDto;
import com.haw.task.common.TaskNotFoundException;
import com.haw.task.dataaccess.api.entity.Task;
import com.haw.task.dataaccess.api.repo.TaskRepository;
import com.haw.task.logic.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mocking SecurityContext and Authentication
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);

        // Mock the behavior when getting principal
        UserDetails userDetails = new User("usernameBeispiel", "passwordBeispiel", Collections.emptyList());
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // Set the mocked SecurityContext to SecurityContextHolder
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetAllTasks() {
        AppUser currentUser = new AppUser();
        currentUser.setId(1L);
        when(userRepository.findByUsername(anyString())).thenReturn(java.util.Optional.of(currentUser));

        Task task1 = new Task();
        task1.setOwnerId(currentUser.getId());
        Task task2 = new Task();
        task2.setOwnerId(currentUser.getId());
        when(taskRepository.findByOwnerId(currentUser.getId())).thenReturn(List.of(task1, task2));

        List<Task> tasks = null;
        try {
            tasks = taskService.getAllTasks();
        } catch (UserNotFoundByUsernameException ignored) {
        }

        assertEquals(2, tasks.size()); // Assuming two tasks are returned for the user
    }

    @Test
    void testGetTaskById() {
        Long taskId = 1L;
        Task task = new Task();
        task.setOwnerId(1L);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        try {
            Task foundTask = taskService.getTaskById(taskId);
            assertEquals(taskId, foundTask.getId());
        } catch (UserNotFoundByUsernameException e) {
        }
    }



    @Test
    void testCreateTask() {
        TaskDto taskDto = new TaskDto();
        taskDto.setTaskName("New Task");
        taskDto.setDescription("Description");
        taskDto.setDueDate(new Date());

        AppUser currentUser = new AppUser();
        currentUser.setId(1L);

        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(currentUser));

        Task savedTask = new Task();
        savedTask.setTaskName(taskDto.getTaskName());
        savedTask.setDescription(taskDto.getDescription());
        savedTask.setDueDate(taskDto.getDueDate());
        savedTask.setUser(currentUser);
        savedTask.setOwnerId(currentUser.getId());

        when(taskRepository.save(any())).thenReturn(savedTask);

        try {
            Task createdTask = taskService.createTask(taskDto);
            assertEquals("New Task", createdTask.getTaskName());
            assertEquals("Description", createdTask.getDescription());
            assertNotNull(createdTask.getDueDate());
            assertEquals(currentUser, createdTask.getUser());
            assertEquals(currentUser.getId(), createdTask.getOwnerId());
        } catch (UserNotFoundByUsernameException e) {
         }
    }


    //Test Updatetask kommt ..

    @Test
    void testDeleteTask() {
        Long taskId = 1L;
        Task existingTask = new Task();
         existingTask.setOwnerId(1L);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(existingTask));

        AppUser currentUser = new AppUser();
        currentUser.setId(1L);

        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(currentUser));

        try {
            taskService.deleteTask(taskId);
            verify(taskRepository, times(1)).delete(existingTask);
        } catch (UserNotFoundByUsernameException | TaskNotFoundException | ForbiddenOperationException e) {
         }
    }
}
