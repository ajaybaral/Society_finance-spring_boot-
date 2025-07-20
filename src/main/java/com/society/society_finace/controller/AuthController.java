package com.society.society_finace.controller;

import com.society.society_finace.dto.LoginRequest;
import com.society.society_finace.entity.User;
import com.society.society_finace.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Register a new user", description = "Register a new user with username, password, and role")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    @Operation(summary = "User login", description = "Authenticate user and return JWT token")
   @PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
    String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
    return ResponseEntity.ok(Map.of("token", token));
}

} 