package com.haw.appuser.dataaccess.api.repo;

import com.haw.appuser.dataaccess.api.entity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;


@Repository
public interface InvalidTokenRepository extends JpaRepository<InvalidToken, Long> {
    boolean existsByTokenValue(String tokenValue);
    @Transactional
    void deleteByInvalidationTimeBefore(Date expirationDate);
}
