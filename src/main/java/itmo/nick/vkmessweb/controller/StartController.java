package itmo.nick.vkmessweb.controller;

import itmo.nick.vkmessweb.data.Data;
import itmo.nick.vkmessweb.requests.CheckRequests;
import itmo.nick.vkmessweb.requests.SetDataRequests;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

        String nextView = getAccess(fieldGroupLink, fieldGroupToken);
        return nextView;
    }

    private String getAccess(String fieldGroupLink, String fieldGroupToken) {
            String tokenURL = fieldGroupToken;
            if (tokenURL.length() > 0) {
                SetDataRequests.setToken(tokenURL);
            }
            String groupIdStr = fieldGroupLink;
            if (groupIdStr.length() > 0) {
                SetDataRequests.setGroupId(groupIdStr);
            }
            CheckRequests.checkGroupIdAndToken();
            if (Data.IS_CORRECT) {
                return "main";
            } else {
                return "start";
            }
    }

    @PostMapping("/processTokenLink")
    @ResponseBody
    public String processTokenLink() {
        String url = "https://oauth.vk.com/authorize?client_id=" + Data.APPLICATION_ID +
                "&scope=wall,offline&redirect_uri=https://oauth.vk.com/blank.html&response_type=token";
        return url;
    }
}
