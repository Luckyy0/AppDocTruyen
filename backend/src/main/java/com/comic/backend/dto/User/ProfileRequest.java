package com.comic.backend.dto.User;

import com.comic.backend.utils.Constants.GENDER;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileRequest {
    private String lastName;
    private String firstName;
    private String image;
    private String description;
    private Integer year;
    private String phoneNumber;
    private GENDER gender;
}
