package com.comic.backend.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.comic.backend.dto.User.JwtResponse;
import com.comic.backend.dto.User.LoginRequest;
import com.comic.backend.dto.User.ProfileRequest;
import com.comic.backend.dto.User.RePasswordRequest;
import com.comic.backend.dto.User.SignupReq;
import com.comic.backend.dto.User.SubcriptionReq;
import com.comic.backend.dto.User.UserDTO;
import com.comic.backend.exception.CommonException;
import com.comic.backend.exception.InvalidInputException;
import com.comic.backend.exception.UserException;
import com.comic.backend.model.User.RefreshToken;
import com.comic.backend.model.User.Role;
import com.comic.backend.model.User.Subscription;
import com.comic.backend.model.User.User;
import com.comic.backend.model.User.UserProfile;
import com.comic.backend.model.User.UserSubscriptionInfo;
import com.comic.backend.repository.User.RoleRepository;
import com.comic.backend.repository.User.SubscriptionRepository;
import com.comic.backend.repository.User.UserProfileRepository;
import com.comic.backend.repository.User.UserRepository;
import com.comic.backend.repository.User.UserSubscriptionInfoRepository;
import com.comic.backend.utils.JwtUtil;
import com.comic.backend.utils.Constants.ROLE;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @Autowired
    private UserSubscriptionInfoRepository userSubscriptionInfoRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public JwtResponse loginUser(LoginRequest loginRequest) {
        try {
            // xác thực
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword());
            authenticationManager.authenticate(auth);
            SecurityContextHolder.getContext().setAuthentication(auth);

            // tạo refresh token
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(loginRequest.getUsername());

            // return access token và refresh token
            return JwtResponse.builder().accessToken(jwtUtil.generateToken(loginRequest.getUsername()))
                    .token(refreshToken.getToken()).build();
        } catch (BadCredentialsException ex) {
            throw new UserException("Password is not incorrect");
        } catch (DisabledException disabledException) {
            return null;
        }
    }

    @Override
    public UserDTO signupUser(SignupReq signupReq) {
        // check input
        if (!signupReq.getPassword().equals(signupReq.getRePassword()))
            throw new InvalidInputException("password and Confirm password are diffrence");
        if (userRepository.findByUsername(signupReq.getUsername()).isPresent())
            throw new UserException("User with the same username already exists.");
        if (userRepository.findByEmail(signupReq.getEmail()).isPresent())
            throw new UserException("email already exists.");

        // check role exsist
        Role role = roleRepository.findByName(ROLE.USER).isPresent() ? roleRepository.findByName(ROLE.USER).get()
                : roleRepository.save(Role.builder().name(ROLE.USER).build());

        // create and save user
        User user = User.builder().username(signupReq.getUsername())
                .email(signupReq.getEmail())
                .password(passwordEncoder.encode(signupReq.getPassword()))
                .userProfile(new UserProfile())
                .roles(new HashSet<>(Arrays.asList(role)))
                .build();
        User userCreated = userRepository.save(user);

        // return
        return UserDTO.builder().username(userCreated.getUsername()).userProfile(userCreated.getUserProfile())
                .roles(userCreated.getRoles().stream().map(rol -> rol.getName().toString()).toList())
                .email(userCreated.getEmail()).build();
    }

    @Override
    public User getUserByJwt(String jwt) {
        jwt = jwt.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        User user = findUserByUsername(username);
        return user;
    }

    public User findUserByUsername(String username) {
        Optional<User> opt = userRepository.findByUsername(username);
        if (opt.isPresent())
            return opt.get();
        throw new UserException("User not found");
    }

    @Override
    public void updateProfile(User user, ProfileRequest profileRequest) {
        UserProfile userProfile = user.getUserProfile();
        userProfile.setFirstName(profileRequest.getFirstName());
        userProfile.setLastName(profileRequest.getLastName());
        userProfile.setImage(profileRequest.getImage());
        userProfile.setDescription(profileRequest.getDescription());
        userProfile.setYear(profileRequest.getYear());
        userProfile.getGender().setName(profileRequest.getGender());
        userProfile.setPhone(profileRequest.getPhoneNumber());
        userProfileRepository.save(userProfile);
    }

    @Override
    public void setNewPassword(User user, RePasswordRequest rePasswordRequest) {
        if (!passwordEncoder.matches(rePasswordRequest.getOldPassword(), user.getPassword()))
            throw new UserException("Please re-enter your old password");
        if (!rePasswordRequest.getNewPassword().equals(rePasswordRequest.getConfirmPassword()))
            throw new UserException("Password and confirm password are difference");
        user.setPassword(passwordEncoder.encode(rePasswordRequest.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void createSubcription(SubcriptionReq subcriptionReq) {
        // check subscription exsist
        if (subscriptionRepository.findByDuration(subcriptionReq.getDuration()).isPresent())
            throw new CommonException("Gói thanh toán đã tồn tại");
        // create
        Subscription subscription = Subscription.builder().description(subcriptionReq.getDescription())
                .duration(subcriptionReq.getDuration())
                .price(subcriptionReq.getPrice())
                .build();
        subscriptionRepository.save(subscription);
    }

    @Override
    public List<Subscription> getListSubscription() {
        return subscriptionRepository.findAll();
    }

    @Override
    public Subscription findSubscriptionById(Long subscriptionId) {
        Optional<Subscription> opt = subscriptionRepository.findById(subscriptionId);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw new CommonException("Subscription not found with id");
    }

    @Override
    public Subscription updateSubscription(Long subscriptionId, SubcriptionReq subcriptionReq) {
        Subscription subscription = findSubscriptionById(subscriptionId);
        if (subcriptionReq.getDescription() != null)
            subscription.setDescription(subcriptionReq.getDescription());
        if (subcriptionReq.getPrice() != null)
            subscription.setPrice(subcriptionReq.getPrice());
        return subscriptionRepository.save(subscription);
    }

    @Override
    public void deleteSubscription(Long subscriptionId) {
        Subscription subscription = findSubscriptionById(subscriptionId);
        subscriptionRepository.delete(subscription);
    }

    @Override
    public User findUserById(Long userId) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isPresent())
            return opt.get();
        throw new CommonException("User is not found");
    }

    @Override
    public boolean checkUserVip(User user) {
        // admin is user vip
        if (user.getRoles().stream().anyMatch(role -> role.getName().equals(ROLE.ADMIN)))
            return true;
        // check user
        UserSubscriptionInfo userSubscriptionInfo = findFirstPayment(user.getId());
        // if not record subsription
        if (userSubscriptionInfo == null)
            return false;
        // if lastest record create at + sub duration < now
        if (userSubscriptionInfo.getCreateAt().plusMonths(userSubscriptionInfo.getSubscription().getDuration())
                .isBefore(LocalDateTime.now())) {
            System.out.println("normal user");
            return false;
        }
        System.out.println("vip user");
        return true;
    }

    public UserSubscriptionInfo findFirstPayment(Long userId) {
        Optional<UserSubscriptionInfo> opt = userSubscriptionInfoRepository
                .findFirstByUserIdOrderByCreateDateDesc(userId);
        if (opt.isPresent())
            return opt.get();
        return null;
    }

    @Override
    public UserSubscriptionInfo getSubscriptionNow(User user) {
        if (user.getRoles().stream().anyMatch(role -> role.getName().equals(ROLE.ADMIN)))
            throw new CommonException("User is admin");
        if(checkUserVip(user)) {
           return findFirstPayment(user.getId());
        }
        throw new CommonException("User hiện tại chưa đăng ký thành viên vip");
    }
}
