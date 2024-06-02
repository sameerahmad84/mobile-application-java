package com.st_gen_app.crud.controller;

import com.st_gen_app.crud.entity.User;
import com.st_gen_app.crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/add")
    public User addUser(@RequestBody User user)
    {
        return service.saveUser(user);
    }

    @PostMapping("/addAll")
    public List<User> addUsers(@RequestBody List<User> users)
    {
        return service.saveAllUser(users);
    }

    @GetMapping("/getAll")
    public List<User> getAllUser()
    {
        return service.getUsers();
    }

    @GetMapping("/get/{id}")
    public Optional<User> getUserById(@PathVariable int id){
        return service.getUserById(id);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user)
    {
        return service.updateUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id)
    {
        return service.deleteUser(id);
    }

    @PostMapping("/authUser")
    public User authUser(@RequestBody User user) { return service.authenticateUser(user); }
 }
