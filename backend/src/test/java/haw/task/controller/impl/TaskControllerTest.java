package haw.task.controller.impl;

import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.task.common.ForbiddenOperationException;
import com.haw.task.common.TaskDto;
import com.haw.task.common.TaskNotFoundException;
import com.haw.task.controller.impl.TaskController;
import com.haw.task.dataaccess.api.entity.Task;
import com.haw.task.logic.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class TaskControllerTest {

    private TaskServiceImpl taskService;
    private TaskController taskController;

    @BeforeEach
    void setUp() {
        taskService = mock(TaskServiceImpl.class);
        taskController = new TaskController();
        taskController.taskService = taskService;
    }

    @Test
    void testGetTasksForCurrentUser() throws UserNotFoundByUsernameException {
        List<Task> tasks = new ArrayList<>();
        when(taskService.getAllTasks()).thenReturn(tasks);

        List<Task> result = taskController.getTasksForCurrentUser();

        assertEquals(tasks, result);
        verify(taskService, times(1)).getAllTasks();
    }
    // Inside TaskControllerTest class

    @Test
    void testGetTaskById() throws UserNotFoundByUsernameException {
        // Given
        Long taskId = 1L;
        Task task = new Task();
        when(taskService.getTaskById(taskId)).thenReturn(task);

        // When
        ResponseEntity<Task> result = taskController.getTaskById(taskId);

        // Then
        assertEquals(task, result.getBody());
        assertEquals(200, result.getStatusCodeValue());
        verify(taskService, times(1)).getTaskById(taskId);
    }

    @Test
    void testCreateTask() throws UserNotFoundByUsernameException {
        // Given
        TaskDto taskDto = new TaskDto();
        Task newTask = new Task();
        when(taskService.createTask(taskDto)).thenReturn(newTask);

        // When
        ResponseEntity<Task> result = taskController.createTask(taskDto);

        // Then
        assertEquals(newTask, result.getBody());
        assertEquals(201, result.getStatusCodeValue());
        verify(taskService, times(1)).createTask(taskDto);
    }

    @Test
    void testUpdateTask() throws UserNotFoundByUsernameException, TaskNotFoundException, ForbiddenOperationException {
        // Given
        Long taskId = 1L;
        TaskDto taskDto = new TaskDto();
        Task updatedTask = new Task();
        when(taskService.updateTask(taskId, taskDto)).thenReturn(updatedTask);

        // When
        ResponseEntity<Task> result = taskController.updateTask(taskId, taskDto);

        // Then
        assertEquals(updatedTask, result.getBody());
        assertEquals(200, result.getStatusCodeValue());
        verify(taskService, times(1)).updateTask(taskId, taskDto);
    }

    @Test
    void testDeleteTask() throws TaskNotFoundException, UserNotFoundByUsernameException, ForbiddenOperationException {
        // Given
        Long taskId = 1L;

        // When
        ResponseEntity<String> result = null;
        try {
            result = taskController.deleteTask(taskId);
        } catch (ForbiddenOperationException e) {
            throw new RuntimeException(e);
        }

        // Then
        assertEquals("Task with ID " + taskId + " has been deleted", result.getBody());
        assertEquals(200, result.getStatusCodeValue());
        verify(taskService, times(1)).deleteTask(taskId);
    }


}
