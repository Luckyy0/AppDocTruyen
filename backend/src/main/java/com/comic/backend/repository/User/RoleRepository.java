package com.comic.backend.repository.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.User.Role;
import com.comic.backend.utils.Constants.ROLE;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ROLE user);

}
