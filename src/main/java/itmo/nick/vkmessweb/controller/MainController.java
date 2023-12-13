package itmo.nick.vkmessweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.swing.*;

@Controller
public class MainController {

    @GetMapping("/main")
    public String start(Model model) {
        return "main";
    }


    @PostMapping("/sendPost")
    public String sendPost(@RequestParam("text") String text) {


        return "main";
    }


    @PostMapping("/clearVars")
    public String clearVars() {

        return "main";
    }

    @PostMapping("/deleteTemplate")
    public String deleteTemplate() {

        return "main";
    }

    @PostMapping("/saveTemplate")
    public String saveTemplate() {

        return "main";
    }

}
