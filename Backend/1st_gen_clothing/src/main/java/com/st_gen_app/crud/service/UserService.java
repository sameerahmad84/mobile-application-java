package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.User;
import com.st_gen_app.crud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public User saveUser(User user)
    {
        return repository.save(user);
    }

    public List<User> saveAllUser(List<User> users)
    {
        return repository.saveAll(users);
    }

    public List<User> getUsers()
    {
        return repository.findAll();
    }

    public Optional<User> getUserById(int id){
        return repository.findById(id);
    }

    public String deleteUser(int id)
    {
        repository.deleteById(id);
        return "User with ID: " + id + " Removed !!";
    }

    public User updateUser(User user)
    {
        User existingUser=repository.getById(user.getUserId());
        existingUser.setUsername(user.getUsername());
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setAddress(user.getAddress());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setProfileImage(user.getProfileImage());

        return repository.save(existingUser);
    }

    public User authenticateUser(User obj)
    {
        List<User> users=repository.findAll();
        String inputEmail=obj.getEmail();
        String inputPassword=obj.getPassword();
        for(User user:users){
            String email=user.getEmail();
            String password=user.getPassword();
            if (email.equals(inputEmail) && password.equals(inputPassword)) {
               return user;
            }
        }
        return null;
    }
}
