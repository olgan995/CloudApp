package com.haw.appuser.dataaccess.api.repo;
import com.haw.appuser.dataaccess.api.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    //Optional<UserApp> findByUsername(String username);
    /**
     * Returns the {@link AppUser} entity with the given name.
     *
     * @param username username of user
     * @return an {@link Optional} containing the found course
     */
    // custom query method using JPQL query string
    @Query("select u from AppUser u where u.username = :username")
    Optional<AppUser> findByUsername(@Param("username") String username);



    /**
     * Returns the {@link AppUser} entities with the given name.
     *
     * @param email the name to search for
     * @return the found courses
     */
    // custom query method using JPQL query string
    @Query("select c from AppUser c where c.email = :email")
    Optional<AppUser> findByEmail(@Param("email") String email);



    /**
     * Deletes the {@link AppUser} entity with the given email.
     *
     * @param email the course number
     */
    // custom query method with query automatically derived from method name (e.g. "<action>By<attribute name>")
    // equivalent SQL query: delete from COURSE where COURSE_NUMBER = [courseNumber.code]
    @Transactional
    // causes the method to be executed in a database transaction (required for write operations)
    void deleteByEmail(String email);

}

