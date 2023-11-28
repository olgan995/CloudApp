package haw.task.dataaccess.api.entity;

import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.task.dataaccess.api.entity.Task;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class TaskTest {

    @Test
    void testConstructorsAndGetters() {
        // Given
        String taskName = "Example Task";
        String description = "Task Description";
        Date dueDate = new Date();
        boolean completed = false;
        Long ownerId = 1L;
        AppUser user = new AppUser();

        Task task = new Task(taskName, description, dueDate, completed, ownerId, user);

        assertNotNull(task);
        assertEquals(taskName, task.getTaskName());
        assertEquals(description, task.getDescription());
        assertEquals(dueDate, task.getDueDate());
        assertEquals(completed, task.isCompleted());
        assertEquals(ownerId, task.getOwnerId());
        assertEquals(user, task.getUser());
    }
    @Test
    void testSetters() {
        Task task = new Task();
        String taskName = "Example Task";
        String description = "Task Description";
        Date dueDate = new Date();
        boolean completed = false;
        Long ownerId = 1L;
        AppUser user = new AppUser();

        task.setTaskName(taskName);
        task.setDescription(description);
        task.setDueDate(dueDate);
        task.setCompleted(completed);
        task.setOwnerId(ownerId);
        task.setUser(user);

        assertEquals(taskName, task.getTaskName());
        assertEquals(description, task.getDescription());
        assertEquals(dueDate, task.getDueDate());
        assertEquals(completed, task.isCompleted());
        assertEquals(ownerId, task.getOwnerId());
        assertEquals(user, task.getUser());
    }

}
