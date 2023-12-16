package itmo.nick.vkmessweb.controller;

import itmo.nick.vkmessweb.handler.TextConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MainController {

    @GetMapping("/main")
    public String start(Model model) {
        return "main";
    }


    @PostMapping("/sendPost")
    @ResponseBody
    public Map<String, String> sendPost(
            @RequestParam("text") String text,
            @RequestParam Map<String, String> vars
    ) {
        Map<String, String> response = new HashMap<>();

        if (TextConstructor.textConstruct(text, vars)) {
            System.out.println("done");
            response.put("success", "true");
        } else {
            System.out.println("NO");
            response.put("success", "false");
        }

        return response;
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
