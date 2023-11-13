package com.comic.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.comic.backend.dto.User.JwtResponse;
import com.comic.backend.dto.User.LoginRequest;
import com.comic.backend.dto.User.ProfileRequest;
import com.comic.backend.dto.User.RePasswordRequest;
import com.comic.backend.dto.User.SignupReq;
import com.comic.backend.dto.User.SubcriptionReq;
import com.comic.backend.dto.User.UserDTO;
import com.comic.backend.model.User.Subscription;
import com.comic.backend.model.User.User;
import com.comic.backend.model.User.UserSubscriptionInfo;

@Service
public interface UserService {

    JwtResponse loginUser(LoginRequest loginRequest);

    UserDTO signupUser(SignupReq signupReq);

    User getUserByJwt(String jwt);

    void updateProfile(User user, ProfileRequest profileRequest);

    void setNewPassword(User user, RePasswordRequest rePasswordRequest);

    void createSubcription(SubcriptionReq subcriptionReq);

    List<Subscription> getListSubscription(Integer search);

    Subscription findSubscriptionById(Long subscriptionId);

    Subscription updateSubscription(Long subscriptionId, SubcriptionReq subcriptionReq);

    void deleteSubscription(Long subscriptionId);

    User findUserById(Long userId);

    boolean checkUserVip(User user);

    UserSubscriptionInfo getSubscriptionNow(User user);
}
