package com.comic.backend.dto.User;

import java.util.List;

import com.comic.backend.model.User.UserProfile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String username;
    private List<String> roles;
    private String email;
    private UserProfile userProfile;
}
