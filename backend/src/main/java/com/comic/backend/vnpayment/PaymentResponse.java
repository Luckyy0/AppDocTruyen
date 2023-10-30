package com.comic.backend.vnpayment;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private Long subscription_id;
    private String username;
    private String email;
    private LocalDateTime createAt;
    private Integer duration;
    private Long price;
    private String info;
    private String status;

}
