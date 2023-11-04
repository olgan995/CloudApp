package com.haw;


import com.haw.appuser.common.Password;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import com.haw.appuser.dataaccess.api.entity.Role;
import com.haw.appuser.dataaccess.api.repo.UserRepository;

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


    private final PasswordEncoder passwordEncoder;


    @Autowired
    public PopulateTestDataRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    }
}
