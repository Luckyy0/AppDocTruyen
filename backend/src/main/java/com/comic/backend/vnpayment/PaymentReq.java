package com.comic.backend.vnpayment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentReq {
    private String bankCode;
    private Long subscriptionId;
}
