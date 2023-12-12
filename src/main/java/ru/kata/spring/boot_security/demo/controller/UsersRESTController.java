package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.MyUserServicelmpl;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersRESTController {
    private final MyUserServicelmpl userService;

    @Autowired
    public UsersRESTController(MyUserServicelmpl userService) {
        this.userService = userService;
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> showAllUsers(){
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public  ResponseEntity<User> showUser(@PathVariable("id") int id){
        return new ResponseEntity<>(userService.findById(id),HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> update(@PathVariable("id") int id, @RequestBody User updatedUser) {
        User existingUser = userService.findById(id);

        if (existingUser != null) {
            existingUser.updateFrom(updatedUser);
            userService.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addNewUser")
    public void addNewUser(@RequestBody User user){
        userService.save(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") int id){
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
