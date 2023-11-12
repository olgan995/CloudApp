package com.haw;


import com.haw.appuser.common.Password;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.entity.Role;
import com.haw.appuser.dataaccess.api.repo.UserRepository;

import com.haw.task.dataaccess.api.entity.Task;
import com.haw.task.dataaccess.api.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;


@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
                        .allowedMethods(CorsConfiguration.ALL)
                        .allowedHeaders(CorsConfiguration.ALL)
                        .allowedOriginPatterns("http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001");
            }
        };
    }
}


@Component
class PopulateTestDataRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;


    private final PasswordEncoder passwordEncoder;


    @Autowired
    public PopulateTestDataRunner(UserRepository userRepository, PasswordEncoder passwordEncoder, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.taskRepository = taskRepository;
    }

    @Transactional
    @Override
    public void run(String... args) {


        AppUser appUser1 = new AppUser("DummyUser6", "test6@dummy.org",
                (new Password(passwordEncoder.encode("qwerty1234!"))), Role.USER);
        AppUser appUser2 = new AppUser("AdminUser7", "test7@dummy.org",
                (new Password(passwordEncoder.encode("qwerty1234!"))), Role.ADMIN);

        userRepository.save(appUser1);
        userRepository.save(appUser2);


        // Create dummy tasks
        Task task1 = new Task("Task 1", "Description 1, Task for DummyUser6",
                new Date(), false, appUser1.getId(), appUser1);
        Task task2 = new Task("Task 2", "Description 2, Task for AdminUser7",
                new Date(), false, appUser2.getId(), appUser2);


        taskRepository.save(task1);
        taskRepository.save(task2);
        appUser1.addNewTaskToListOfTasks(task1);
        appUser2.addNewTaskToListOfTasks(task2);
        userRepository.save(appUser1);
        userRepository.save(appUser2);


    }
}
