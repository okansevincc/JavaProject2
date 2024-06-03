package com.java.service;

import com.java.dto.UserDTO;
import com.java.entity.User;
import com.java.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public User findById(Long id) {

        Optional<User> result = userRepository.findById(id);
        User user = null;

        if(result.isPresent()){
            user = result.get();
        }
        else{
            throw new RuntimeException("Did not found user with id: "+ id);
        }

        return user;
    }

    @Override
    public User save(User theUser) {
        return userRepository.save(theUser);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    private UserDTO convertEntityToDto(User user){
        UserDTO userDTO;
        userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

}
