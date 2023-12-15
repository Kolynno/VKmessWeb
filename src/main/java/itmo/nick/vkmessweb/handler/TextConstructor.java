package itmo.nick.vkmessweb.handler;

import itmo.nick.vkmessweb.requests.VKRequests;
import javafx.collections.ObservableList;

import java.nio.charset.StandardCharsets;
import java.util.Map;

public class TextConstructor {

    public static Boolean textConstruct(String originalText, Map<String, String> variableMap) {
        String textToPost = originalText;

        for (Map.Entry<String, String> entry : variableMap.entrySet()) {
            String variableName = entry.getKey();
            String variableValue = entry.getValue();

            textToPost = textToPost.replace("__" + variableName + "__", variableValue);
        }
        textToPost = new String(textToPost.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        textToPost = textToPost.trim();

        return VKRequests.WallPost(textToPost);
    }
}
