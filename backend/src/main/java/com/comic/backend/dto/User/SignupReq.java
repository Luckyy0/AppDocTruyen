package com.comic.backend.dto.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupReq {
    private String username;
    private String password;
    private String rePassword;
    private String email;
}
