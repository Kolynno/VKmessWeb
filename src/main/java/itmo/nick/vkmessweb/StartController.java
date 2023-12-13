package itmo.nick.vkmessweb;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class StartController {

    @GetMapping("/start")
    public String start(Model model) {
        return "start";
    }

    @PostMapping("/processFormData")
    public String processFormData(
            @RequestParam("fieldGroupLink") String fieldGroupLink,
            @RequestParam("fieldGroupToken") String fieldGroupToken,
            Model model) {

        System.out.println(fieldGroupLink);

        return "start";
    }
}
