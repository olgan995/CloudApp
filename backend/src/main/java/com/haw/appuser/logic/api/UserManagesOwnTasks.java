package com.haw.appuser.logic.api;

import com.haw.appuser.common.exceptions.UserNotFoundByIdException;
import com.haw.task.common.TaskAlreadyExistsExeption;
import com.haw.task.common.TaskDto;
import com.haw.task.common.TaskNotFoundException;
import com.haw.task.dataaccess.api.entity.Task;

import java.util.Set;

/**
 This interface outlines the methods that a user can use to manage their tasks.
 */

public interface UserManagesOwnTasks {


    /**
     Adds a new task to the user's account.
     @param userId The ID of the user adding the collection.
     @param taskDto
     @throws UserNotFoundByIdException If the user with the specified ID cannot be found.
     @throws com.haw.task.common.TaskAlreadyExistsExeption
     */
    public Long addTask(Long userId, TaskDto taskDto) throws UserNotFoundByIdException, TaskAlreadyExistsExeption;


    /**
     Updates an existing list in the user's account.
     @param userId The ID of the user updating the collection.
     @param taskId The ID of the set to update.
     @param taskDto taskDto object representing the updated task.
     @throws com.haw.task.common.TaskNotFoundException
     @throws UserNotFoundByIdException If the user with the specified ID cannot be found.
     */
    void updateTask(Long userId, Long taskId, TaskDto taskDto) throws TaskNotFoundException, UserNotFoundByIdException;

    /**
     Deletes a collection from the user's account.
     If owner is deleting set-> it will be deleted altogether, however if normal user will try to delete the set,
     it will be deleted only from its own collection

     @param userId The ID of the user deleting the collection.
     @param taskId The ID of the task to delete.
     @throws TaskNotFoundException If a set with the specified ID cannot be found.
     @throws UserNotFoundByIdException If the user with the specified ID cannot be found.
     */
    void deleteListOfTasks(Long userId, Long taskId) throws TaskNotFoundException, UserNotFoundByIdException;

    /**
     Gets a list of all tasks owned by the user.
     @param userId The ID of the user to get collections for.
     @return A list of tasks objects representing the user's sets.
     @throws UserNotFoundByIdException If the user with the specified ID cannot be found.
     */
    Set<Task> getOwnTasks(Long userId) throws UserNotFoundByIdException;
}
