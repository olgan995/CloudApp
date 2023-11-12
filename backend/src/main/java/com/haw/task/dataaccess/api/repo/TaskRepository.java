package com.haw.task.dataaccess.api.repo;

import com.haw.task.dataaccess.api.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @PreAuthorize("#ownerId == authentication.principal.id")
    List<Task> findByOwnerId(@Param("ownerId") Long ownerId);
}

