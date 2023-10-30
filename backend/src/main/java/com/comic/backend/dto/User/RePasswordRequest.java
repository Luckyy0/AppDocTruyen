package com.comic.backend.dto.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RePasswordRequest {
    String oldPassword;
    String newPassword;
    String confirmPassword;
}
