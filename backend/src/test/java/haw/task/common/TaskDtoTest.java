package haw.task.common;

import com.haw.task.common.TaskDto;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TaskDtoTest {

    @Test
    public void testGettersAndSetters() {
        // Given
        TaskDto taskDto = new TaskDto();

        // When
        taskDto.setTaskName("TaskName");
        taskDto.setDescription("Description");
        taskDto.setDueDate(new Date());
        taskDto.setCompleted(true);

        // Then
        assertEquals("TaskName", taskDto.getTaskName());
        assertEquals("Description", taskDto.getDescription());
        assertTrue(taskDto.isCompleted());
        // Validate dueDate in an appropriate way, e.g., assertEquals for Date objects
    }
}
