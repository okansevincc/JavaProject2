package com.java.response;

public class AuthResponse {

    String message;
    String id;
    String email;

    public AuthResponse() {
    }

    public AuthResponse(String message, String id, String email) {
        this.message = message;
        this.id = id;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
