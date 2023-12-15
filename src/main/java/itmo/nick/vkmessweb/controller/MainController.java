package itmo.nick.vkmessweb.controller;

import itmo.nick.vkmessweb.handler.TextConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class MainController {

    @GetMapping("/main")
    public String start(Model model) {
        return "main";
    }


    @PostMapping("/sendPost")
    public String sendPost(
            @RequestParam("text") String text,
            @RequestParam Map<String, String> vars
    ) {
        if (TextConstructor.textConstruct(text, vars)) {
            System.out.println("done");
        } else {
            System.out.println("NO");
        }
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
