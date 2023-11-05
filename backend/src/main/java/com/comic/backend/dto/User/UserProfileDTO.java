package com.comic.backend.dto.User;

import java.util.List;

import com.comic.backend.utils.Constants.GENDER;
import com.comic.backend.utils.Constants.ROLE;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private String username;

    private String email;

    private String lastName;

    private String firstName;

    private String image;

    private String description;

    private Integer year;

    private String phone;

    private GENDER gender;

    private List<ROLE> roles;
}
