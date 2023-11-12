package com.haw.task.controller.impl;

import com.haw.appuser.common.exceptions.UserNotFoundByUsernameException;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.repo.UserRepository;
import com.haw.appuser.logic.api.UserService;
import com.haw.task.common.TaskDto;
import com.haw.task.common.TaskNotFoundException;
import com.haw.task.dataaccess.api.entity.Task;
import com.haw.task.dataaccess.api.repo.TaskRepository;
import com.haw.task.logic.impl.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    TaskServiceImpl taskService;

    @Autowired
    UserRepository userRepository;
    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserService userService;


    @GetMapping
    //@PreAuthorize("#userId == authentication.name")
    //public ResponseEntity<List<Task>> getTasks(@AuthenticationPrincipal String userId) {
    public List<Task> getTasksForCurrentUser() throws UserNotFoundByUsernameException {
        return taskService.getAllTasks();
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDto task) throws UserNotFoundByUsernameException {
        Task newTask = taskService.createTask(task);
        // Return the saved task and a 201 Created response
        return ResponseEntity.status(201).body(newTask);
    }

    @PatchMapping
    public ResponseEntity<Task> updateTask(@RequestBody TaskDto task, Long taskId) throws UserNotFoundByUsernameException, TaskNotFoundException {
        Task newTask = taskService.updateTask(taskId, task);
        return ResponseEntity.status(200).body(newTask);
    }
}
