package com.java.controller;

import com.java.entity.User;
import com.java.requests.UserRequest;
import com.java.response.AuthResponse;
import com.java.security.JwtTokenProvider;
import com.java.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;

    private UserService userService;

    private PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider, UserService userService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody UserRequest loginRequest){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());

        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = tokenProvider.generateJwtToken(auth);

        User user = userService.findUserByEmail(loginRequest.getEmail());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Bearer " + jwtToken);
        authResponse.setId(user.getId().toString());
        authResponse.setEmail(user.getEmail().toString());

        return authResponse;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user){
        AuthResponse authResponse = new AuthResponse();
        // check if email is already existed
        if(userService.findUserByEmail(user.getEmail()) != null){
            authResponse.setMessage("Email already in use.");
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }

        // encode password and save
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
        authResponse.setMessage("Successfully registered. You can login.");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

}
