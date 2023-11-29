package com.comic.backend.vnpayment;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comic.backend.exception.CommonException;
import com.comic.backend.model.User.Subscription;
import com.comic.backend.model.User.User;
import com.comic.backend.model.User.UserSubscriptionInfo;
import com.comic.backend.repository.User.UserSubscriptionInfoRepository;
import com.comic.backend.service.UserService;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping()
public class PaymentController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserSubscriptionInfoRepository userSubscriptionInfoRepository;

    @PostMapping("/api/payment/createPayment")
    public ResponseEntity<?> createPayment(HttpServletRequest req,
            @RequestHeader("Authorization") String jwt,
            @RequestBody PaymentReq paymentReq)
            throws UnsupportedEncodingException {

        User user = userService.getUserByJwt(jwt);
        if (userService.checkUserVip(user))
            throw new CommonException("User hiện đang sử dụng gói đăng ký ");
        Long user_id = user.getId();
        Long subscription_id = paymentReq.getSubscriptionId();
        Subscription subscription = userService.findSubscriptionById(subscription_id);

        String returnUrl = Config.vnp_ReturnUrl + "/" + subscription_id + "/" + user_id;

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = subscription.getPrice() * 1000 * 100;
        String bankCode = paymentReq.getBankCode();

        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = Config.getIpAddress(req);

        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = req.getParameter("language");
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }
        vnp_Params.put("vnp_ReturnUrl", returnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                // Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                // Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;

        PaymentStatus paymentStatus = PaymentStatus.builder().code("00").message("success").data(paymentUrl)
                .build();
        return new ResponseEntity<>(paymentStatus, HttpStatus.ACCEPTED);
    }

    @GetMapping("/payment/payment_info/{subscription_id}/{user_id}")
    public void paymentInfo(
            HttpServletResponse res,
            @PathVariable("subscription_id") Long subscription_id,
            @PathVariable("user_id") Long user_id,
            @RequestParam("vnp_Amount") String amount,
            @RequestParam("vnp_BankCode") String bankCode,
            @RequestParam("vnp_BankTranNo") String bankTranNo,
            @RequestParam("vnp_CardType") String cardType,
            @RequestParam("vnp_OrderInfo") String orderInfoString,
            @RequestParam("vnp_PayDate") String payDate,
            @RequestParam("vnp_ResponseCode") String responseCode,
            @RequestParam("vnp_TmnCode") String TmnCode,
            @RequestParam("vnp_TransactionNo") String transactionNo,
            @RequestParam("vnp_TxnRef") String txnRef,
            @RequestParam("vnp_SecureHash") String secureHash
            ) throws IOException, ServletException {

        User user = userService.findUserById(user_id);
        Subscription subscription = userService.findSubscriptionById(subscription_id);
        UserSubscriptionInfo userSubscriptionInfo = new UserSubscriptionInfo();
        if (responseCode.equals("00")) {
            userSubscriptionInfo = UserSubscriptionInfo.builder().user(user)
                    .subscription(subscription)
                    .info("Transaction No: " + transactionNo + " Bank code: " + bankCode + " Pay date : " + payDate
                            + " Amount : " + amount)
                    .status("OK")
                    .build();
        } else {
            userSubscriptionInfo = UserSubscriptionInfo.builder().user(user)
                    .subscription(subscription)
                    .info("Transaction No: " + transactionNo + " Bank code: " + bankCode + " Pay date : " + payDate
                            + " Amount : " + amount)
                    .status("FAILED")
                    .build();
        }
        UserSubscriptionInfo created = userSubscriptionInfoRepository.save(userSubscriptionInfo);

        res.sendRedirect("http://localhost:3000/payment_info/"+created.getId());
    //     return new ResponseEntity<>(PaymentResponse.builder()
    //             .subscription_id(created.getId())
    //             .email(created.getUser().getEmail())
    //             .username(created.getUser().getUsername())
    //             .price(created.getSubscription().getPrice() * 1000)
    //             .duration(created.getSubscription().getDuration())
    //             .createAt(created.getCreateAt())
    //             .info(created.getInfo())
    //             .status(created.getStatus()).build(), HttpStatus.ACCEPTED);
    }
}
