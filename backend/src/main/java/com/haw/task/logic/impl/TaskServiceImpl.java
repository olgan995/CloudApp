package com.haw.task.logic.impl;

import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.repo.UserRepository;
import com.haw.task.common.TaskDto;
import com.haw.task.common.TaskNotFoundException;
import com.haw.task.common.ForbiddenOperationException;
import com.haw.task.dataaccess.api.entity.Task;
import com.haw.task.dataaccess.api.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;


    public List<Task> getAllTasks() throws UserNotFoundByUsernameException {
        AppUser currentUser = findUser();
        return taskRepository.findByOwnerId(currentUser.getId());
    }


    public Task getTaskById(Long taskId) throws UserNotFoundByUsernameException {
        return getAllTasks().stream()
                .filter(task -> task.getId().equals(taskId))
                .findFirst()
                .orElse(null);
    }

    public List<Task> getTasksByUserId(String userId) throws UserNotFoundByUsernameException {
        return getAllTasks().stream()
                .filter(task -> task.getUser().getId().equals(userId))
                .collect(Collectors.toList());
    }


    public Task createTask(TaskDto taskDto) throws UserNotFoundByUsernameException {


        AppUser currentUser = findUser();

        Task task = new Task();
        task.setTaskName(taskDto.getTaskName());
        task.setDescription(taskDto.getDescription());
        task.setUser(currentUser);
        task.setDueDate(taskDto.getDueDate());
        task.setOwnerId(currentUser.getId());
        Task managedTask = taskRepository.save(task);

        return managedTask;
    }


    public Task updateTask(Long taskId, TaskDto updatedTask) throws TaskNotFoundException,
            UserNotFoundByUsernameException,
            ForbiddenOperationException {
        Long currentUserID = findUser().getId();


        //AppUser currentUser = findUser();
        Task taskToEdit = taskRepository.findById(taskId).orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!taskToEdit.getOwnerId().equals(currentUserID)) {
            throw new ForbiddenOperationException("You are not allowed to update this task");
        }


        // Update the fields you want to allow modification
        if (updatedTask.getTaskName() != null) {
            taskToEdit.setTaskName(updatedTask.getTaskName());
        }
        if (updatedTask.getDescription() != null) {
            taskToEdit.setDescription(updatedTask.getDescription());
        }
        if (updatedTask.getDueDate() != null) {
            taskToEdit.setDueDate(updatedTask.getDueDate());
        }
        if (updatedTask.isCompleted() != taskToEdit.isCompleted()) {
            taskToEdit.setCompleted(updatedTask.isCompleted());
        }
        // Save the updated task
        return taskRepository.save(taskToEdit);
    }

    public void deleteTask(Long taskId) throws TaskNotFoundException, UserNotFoundByUsernameException, ForbiddenOperationException {

        Long currentUserID = findUser().getId();
        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!existingTask.getOwnerId().equals(currentUserID)) {
            throw new ForbiddenOperationException("You are not allowed to delete this task");
        }

        taskRepository.delete(existingTask);
    }


    private AppUser findUser() throws UserNotFoundByUsernameException {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundByUsernameException(username));
    }
}
