package com.comic.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.comic.backend.model.User.RefreshToken;

@Service
public interface RefreshTokenService {
    public RefreshToken createRefreshToken(String username);

    public Optional<RefreshToken> findByToken(String Token);

    public RefreshToken verifyRefreshToken(RefreshToken token);

    public void deleteToken(String username,String jwt);

}
