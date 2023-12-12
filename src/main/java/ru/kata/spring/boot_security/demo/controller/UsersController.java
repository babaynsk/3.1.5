package ru.kata.spring.boot_security.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.MyUserService;
import ru.kata.spring.boot_security.demo.service.MyUserServicelmpl;

import java.util.List;

@Controller
public class UsersController {

    private final MyUserService userService;


    @Autowired
    public UsersController(MyUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String showAdminPage(Model model, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<User> allUsers = userService.findAll();
        model.addAttribute("allUsers", allUsers);
        model.addAttribute("user", user);
        return "admin";
    }

    @GetMapping("/addNewUser")
    public String addNewUser(Model model,Authentication authentication) {
        model.addAttribute("authUser",(User)authentication.getPrincipal());
        model.addAttribute("user", new User());
        return "user-info";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute("user") User user) {
        userService.save(user);
        return "redirect:/admin";
    }


    @PutMapping("/saveUpdatedUser/{id}")
    public String saveUpdatedUser(@ModelAttribute("updatedUser") User updatedUser, @PathVariable("id") int id) {
        if (updatedUser.getId() != id) {
            return "redirect:/error";
        }

        userService.save(updatedUser);
        return "redirect:/admin";
    }

    @DeleteMapping ("/deleteUser")
    public String deleteUser(@RequestParam("id") int id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

    @GetMapping("/index")
    public String showFirstPage(){
        return "index";
    }

    @GetMapping("/user")
    public String showUserPage(Model model,Authentication authentication){
        User user = (User) authentication.getPrincipal();
        model.addAttribute("authUser",user);
        return "user";
    }
}