package com.java.controller;

import com.java.entity.User;
import com.java.requests.PurchaseRequest;
import com.java.response.AuthResponse;
import com.java.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MainController {

    private UserService userService;

    @Autowired
    public MainController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/purchase")
    public AuthResponse setUserBoughtField(@RequestBody PurchaseRequest request) {
        User user = userService.findById(request.getId());
        user.setBought(request.getBought());
        userService.save(user);
        AuthResponse authResponse = new AuthResponse();
        if(request.getBought()) {
            authResponse.setMessage("Purchase successful.");
        } else {
            authResponse.setMessage("The purchase reversal was successful.");
        }

        return authResponse;
    }

    @GetMapping("/bought/{id}")
    public Boolean getIsBoughtOfUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return user.getBought();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        userService.deleteById(id);

        return ResponseEntity.ok("Deleted successfully.");
    }

}
