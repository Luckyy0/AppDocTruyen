package com.comic.backend.repository.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.User.User;

public interface UserRepository extends JpaRepository<User,Long>  {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
    
}
