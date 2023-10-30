package com.comic.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.comic.backend.dto.User.JwtResponse;
import com.comic.backend.dto.User.RefreshTokenRequest;
import com.comic.backend.exception.CommonException;
import com.comic.backend.model.User.RefreshToken;
import com.comic.backend.service.RefreshTokenService;
import com.comic.backend.utils.CommonFunction;
import com.comic.backend.utils.JwtUtil;
import com.comic.backend.utils.Constants.JsonConstant;
import com.comic.backend.utils.Constants.PathConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
@RequestMapping("/")
public class ValidateTokenController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping(PathConstants.REFRESH_TOKEN)
    public ResponseEntity<?> refreshToken(@RequestBody String refreshTokenReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ValidateTokenController.class, refreshTokenReqStr,
                JsonConstant.JSON_REQ_REFRESH_TOKEN);
        RefreshTokenRequest refreshTokenRequest = CommonFunction.stringJsonToObject(RefreshTokenRequest.class,
                refreshTokenReqStr);

        return refreshTokenService.findByToken(refreshTokenRequest.getToken())
                .map(refreshTokenService::verifyRefreshToken)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String accessToken = jwtUtil.generateToken(user.getUsername());
                    JwtResponse jwtResponse = JwtResponse.builder().accessToken(accessToken)
                            .token(refreshTokenRequest.getToken()).build();
                    return new ResponseEntity<>(jwtResponse, HttpStatus.ACCEPTED);
                }).orElseThrow(() -> new CommonException("RefreshToken is not in database"));
    }
}
