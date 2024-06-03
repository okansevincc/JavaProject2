package com.java.service;

import com.java.dto.UserDTO;
import com.java.entity.User;


import java.util.List;

public interface UserService {

    List<UserDTO> findAll();

    User findById(Long id);

    User save(User user);

    void deleteById(Long id);

    User findUserByEmail(String email);

}
