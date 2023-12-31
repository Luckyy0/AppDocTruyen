package com.comic.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comic.backend.dto.CheckRes;
import com.comic.backend.dto.ViewComicRes;
import com.comic.backend.dto.Comic.SubscriptionRes;
import com.comic.backend.dto.User.ApiResponse;
import com.comic.backend.dto.User.JwtResponse;
import com.comic.backend.dto.User.LoginRequest;
import com.comic.backend.dto.User.ProfileRequest;
import com.comic.backend.dto.User.RePasswordRequest;
import com.comic.backend.dto.User.SignupReq;
import com.comic.backend.dto.User.SubcriptionReq;
import com.comic.backend.dto.User.UserDTO;
import com.comic.backend.dto.User.UserProfileDTO;
import com.comic.backend.model.User.Subscription;
import com.comic.backend.model.User.User;
import com.comic.backend.model.User.UserSubscriptionInfo;
import com.comic.backend.service.RefreshTokenService;
import com.comic.backend.service.UserService;
import com.comic.backend.utils.CommonFunction;
import com.comic.backend.utils.Constants.JsonConstant;
import com.comic.backend.utils.Constants.PathConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")

public class UserController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private UserService userService;

    @PostMapping(PathConstants.LOGIN)
    public ResponseEntity<?> login(@RequestBody String loginRequestStr, HttpServletResponse httpServletResponse)
            throws IOException, JsonMappingException, JsonProcessingException {

        CommonFunction.jsonValidate(UserController.class, loginRequestStr, JsonConstant.JSON_REQ_LOGIN_USER);
        LoginRequest loginRequest = CommonFunction.stringJsonToObject(LoginRequest.class, loginRequestStr);
        JwtResponse jwtResponse = userService.loginUser(loginRequest);
        return new ResponseEntity<>(jwtResponse, HttpStatus.ACCEPTED);
    }

    @PostMapping(PathConstants.SIGNUP)
    public ResponseEntity<?> signup(@RequestBody String signupReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(UserController.class, signupReqStr, JsonConstant.JSON_REQ_SIGNUP_USER);
        SignupReq signupReq = CommonFunction.stringJsonToObject(SignupReq.class, signupReqStr);
        UserDTO userDTO = userService.signupUser(signupReq);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @GetMapping(PathConstants.PROFILE)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String jwt) {
        User user = userService.getUserByJwt(jwt);

        UserProfileDTO profile = UserProfileDTO.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getUserProfile().getFirstName())
                .lastName(user.getUserProfile().getLastName())
                .image(user.getUserProfile().getImage())
                .description(user.getUserProfile().getDescription())
                .year(user.getUserProfile().getYear())
                .phone(user.getUserProfile().getPhone())
                .gender(user.getUserProfile().getGender().getName())
                .roles(user.getRoles().stream().map(role -> role.getName()).toList())
                .build();
        return new ResponseEntity<>(profile, HttpStatus.ACCEPTED);
    }

    @PostMapping(PathConstants.PROFILE)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> setProfile(@RequestBody String profileReqStr, @RequestHeader("Authorization") String jwt)
            throws JsonMappingException, JsonProcessingException {
        System.out.println("update profile");
        User user = userService.getUserByJwt(jwt);

        CommonFunction.jsonValidate(UserController.class, profileReqStr, JsonConstant.JSON_REQ_UPDATE_PROFILE);
        ProfileRequest profileRequest = CommonFunction.stringJsonToObject(ProfileRequest.class, profileReqStr);

        userService.updateProfile(user, profileRequest);
        System.out.println(user.getUsername());
        return new ResponseEntity<>(user.getUserProfile(), HttpStatus.ACCEPTED);
    }

    @PostMapping(PathConstants.CHANGE_PASSWORD)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> setNewPassword(@RequestHeader("Authorization") String jwt,
            @RequestBody String rePasswordRequestStr) throws JsonMappingException, JsonProcessingException {

        CommonFunction.jsonValidate(UserController.class, rePasswordRequestStr, JsonConstant.JSON_REQ_CHANGE_PASSWORD);
        RePasswordRequest rePasswordRequest = CommonFunction.stringJsonToObject(RePasswordRequest.class,
                rePasswordRequestStr);

        User user = userService.getUserByJwt(jwt);
        userService.setNewPassword(user, rePasswordRequest);
        return new ResponseEntity<>(new ApiResponse("Password change successfull"), HttpStatus.ACCEPTED);
    }

    @PostMapping(PathConstants.LOGOUT)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String jwt)
            throws JsonMappingException, JsonProcessingException {
        User user = userService.getUserByJwt(jwt);
        refreshTokenService.deleteToken(user.getUsername(), jwt);
        return new ResponseEntity<>(new ApiResponse("Logout successfull"), HttpStatus.ACCEPTED);
    }

    @PostMapping(PathConstants.SUBSCRIPTION)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createSubscription(@RequestHeader("Authorization") String jwt,
            @RequestBody String subscriptionReqStr) throws JsonMappingException, JsonProcessingException {

        CommonFunction.jsonValidate(UserController.class, subscriptionReqStr,
                JsonConstant.JSON_REQ_CREATE_SUBSCRIPTION);
        SubcriptionReq subcriptionReq = CommonFunction.stringJsonToObject(SubcriptionReq.class, subscriptionReqStr);

        userService.createSubcription(subcriptionReq);
        return new ResponseEntity<>(new ApiResponse("add Subscription successfull"), HttpStatus.ACCEPTED);
    }

    @PutMapping(PathConstants.UPDATE_SUBSCRIPTION)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateSubscription(@RequestHeader("Authorization") String jwt,
            @PathVariable Long subscriptionId,
            @RequestBody String subscriptionReqStr) throws JsonMappingException, JsonProcessingException {

        CommonFunction.jsonValidate(UserController.class, subscriptionReqStr,
                JsonConstant.JSON_REQ_UPDATE_SUBSCRIPTION);
        SubcriptionReq subcriptionReq = CommonFunction.stringJsonToObject(SubcriptionReq.class, subscriptionReqStr);
        Subscription subscription = userService.updateSubscription(subscriptionId, subcriptionReq);
        return new ResponseEntity<>(subscription, HttpStatus.ACCEPTED);
    }

    @DeleteMapping(PathConstants.UPDATE_SUBSCRIPTION)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteSubscription(
            @PathVariable Long subscriptionId) throws JsonMappingException, JsonProcessingException {
        userService.deleteSubscription(subscriptionId);
        return new ResponseEntity<>(new ApiResponse("Delete successfully"), HttpStatus.ACCEPTED);
    }

    @GetMapping(PathConstants.GET_LIST_SUBSCRIPTION)
    public ResponseEntity<?> getListSubscription(@RequestParam(defaultValue = "0") Integer search) {

        List<SubscriptionRes> subscriptions = userService.getListSubscription(search);
        return new ResponseEntity<>(subscriptions, HttpStatus.ACCEPTED);
    }

    @GetMapping(PathConstants.CHECK_SUBSCRIPTION)
    public ResponseEntity<?> getSubscriptionNow(@RequestHeader("Authorization") String jwt) {
        User user = userService.getUserByJwt(jwt);
        UserSubscriptionInfo userSubscriptionInfo = userService.getSubscriptionNow(user);
        return new ResponseEntity<>(userSubscriptionInfo, HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/payment_info/{subscription_info_id}")
    public ResponseEntity<?> getSubscriptionInfo(@RequestHeader("Authorization") String jwt,
            @PathVariable("subscription_info_id") Long sub_info_id) {
        User user = userService.getUserByJwt(jwt);
        UserSubscriptionInfo userSubscriptionInfo = userService.getSubscriptionInfo(user,sub_info_id);
        return new ResponseEntity<>(userSubscriptionInfo, HttpStatus.ACCEPTED);
    }

    @GetMapping("api/history")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getViewHistory(@RequestHeader("Authorization") String jwt,
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "4") int pageSize) {
        User user = userService.getUserByJwt(jwt);
        Page<ViewComicRes> page = userService.getViewsHistory(user, pageNumber, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("api/like")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getLikeHistory(@RequestHeader("Authorization") String jwt,
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "4") int pageSize) {
        User user = userService.getUserByJwt(jwt);
        Page<ViewComicRes> page = userService.getLikesHistory(user, pageNumber, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("api/follow")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getFollowHistory(@RequestHeader("Authorization") String jwt,
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "4") int pageSize) {
        User user = userService.getUserByJwt(jwt);
        Page<ViewComicRes> viewComics = userService.getFollowsHistory(user, pageNumber, pageSize);
        return new ResponseEntity<>(viewComics, HttpStatus.OK);
    }

    @GetMapping("/api/hello")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public String hello() {
        return "hello";

    }

    @GetMapping("/api/checkuser")
    public ResponseEntity<?> checkUserVip(@RequestHeader("Authorization") String jwt) throws IOException {
        User user = userService.getUserByJwt(jwt);
        boolean check = userService.checkUserVip(user);
        return new ResponseEntity<>(CheckRes.builder().status(check).build(), HttpStatus.OK);

    }

}
