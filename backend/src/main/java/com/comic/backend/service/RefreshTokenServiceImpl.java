package com.comic.backend.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comic.backend.exception.CommonException;
import com.comic.backend.model.User.RefreshToken;
import com.comic.backend.repository.User.RefreshTokenRepository;
import com.comic.backend.repository.User.UserRepository;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public RefreshToken createRefreshToken(String username) {
        RefreshToken refreshToken = refreshTokenRepository.findByUsername(username);
        if (refreshToken == null) {
            refreshToken = RefreshToken.builder()
                    .user(userRepository.findByUsername(username).get())
                    .token(UUID.randomUUID().toString())
                    .expiryDate(Instant.now().plusMillis(1000 * 60 * 60 * 12))
                    .build();
        } else {
            refreshToken.setToken(UUID.randomUUID().toString());
            refreshToken.setExpiryDate(Instant.now().plusMillis(1000 * 60 * 60 * 12));
        }
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public RefreshToken verifyRefreshToken(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new CommonException(
                    "token " + token.getToken() + " Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Override
    public void deleteToken(String username, String jwt) {
        RefreshToken refreshToken = refreshTokenRepository.findByUsername(username);
        if (refreshToken != null)
            refreshTokenRepository.delete(refreshToken);
        // ... đưa token vào blacklist
        // SecurityContextHolder.getContext().setAuthentication(null);
    }

}
