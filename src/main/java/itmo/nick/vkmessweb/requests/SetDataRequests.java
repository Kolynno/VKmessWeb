package itmo.nick.vkmessweb.requests;

import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import itmo.nick.vkmessweb.data.Data;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class SetDataRequests {

    public static void setGroupId(String groupIdStr) {
        groupIdStr = groupIdStr.substring(15).trim();
        Data.GROUP_ID = getGroupIdAndName(groupIdStr);
    }

    private static String getGroupIdAndName(String groupURL) {

        int id = 0;
        try {
            HttpClient httpClient = HttpClients.createDefault();
            String apiUrl = "https://api.vk.com/method/groups.getById?group_id=" + groupURL + "&access_token=" + Data.TOKEN + "&v=5.154";
            HttpGet request = new HttpGet(apiUrl);
            HttpResponse response = httpClient.execute(request);

            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));
            StringBuilder responseStringBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                responseStringBuilder.append(line);
            }

            ObjectMapper objectMapper = new ObjectMapper().enable(JsonReadFeature.ALLOW_UNESCAPED_CONTROL_CHARS.mappedFeature());
            objectMapper.setLocale(Locale.forLanguageTag("ru-RU"));

            JsonNode jsonResponse = objectMapper.readTree(responseStringBuilder.toString());
            JsonNode responseNode = jsonResponse.get("response");
            if (responseNode != null && responseNode.has("groups")) {
                JsonNode groupsNode = responseNode.get("groups");

                if (groupsNode.isArray() && !groupsNode.isEmpty()) {
                    JsonNode firstGroupNode = groupsNode.get(0);

                    if (firstGroupNode.has("id")) {
                        id = firstGroupNode.get("id").asInt();
                        Data.IS_CORRECT_GROUP_ID = true;
                    }
                    if(firstGroupNode.has("name")) {
                        Data.GROUP_NAME = firstGroupNode.get("name").asText();
                    }
                }
            } else {
                System.out.println("ID group isn't correct");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return String.valueOf(id);
    }


    private static void getGroupName(String groupURL) {

        int id = 0;

        try {
            HttpClient httpClient = HttpClients.createDefault();
            String apiUrl = "https://api.vk.com/method/groups.getById?group_id=" + groupURL + "&access_token=" + Data.TOKEN + "&v=5.154";
            HttpGet request = new HttpGet(apiUrl);
            HttpResponse response = httpClient.execute(request);

            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));
            StringBuilder responseStringBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                responseStringBuilder.append(line);
            }

            ObjectMapper objectMapper = new ObjectMapper().enable(JsonReadFeature.ALLOW_UNESCAPED_CONTROL_CHARS.mappedFeature());
            objectMapper.setLocale(Locale.forLanguageTag("ru-RU"));

            JsonNode jsonResponse = objectMapper.readTree(responseStringBuilder.toString());
            JsonNode responseNode = jsonResponse.get("response");
            if (responseNode != null && responseNode.has("groups")) {
                JsonNode groupsNode = responseNode.get("groups");

                if (groupsNode.isArray() && !groupsNode.isEmpty()) {
                    JsonNode firstGroupNode = groupsNode.get(0);

                    if(firstGroupNode.has("name")) {
                        Data.GROUP_NAME = firstGroupNode.get("name").asText();
                    }
                }
            } else {
                System.out.println("ID group isn't correct");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void setToken(String inputString) {
        String fragment = inputString.split("#")[1];
        String decodedFragment = URLDecoder.decode(fragment, StandardCharsets.UTF_8);
        Data.TOKEN = getAccessToken(decodedFragment);
        Data.IS_CORRECT_TOKEN = true;
    }

    /**
     * Разделяет url по частям и находит значение токена
     * */
    private static String getAccessToken(String url) {
        String[] params = url.split("&");
        Map<String, String> paramMap = new HashMap<>();
        for (String param : params) {
            String[] keyValue = param.split("=");
            if (keyValue.length == 2) {
                paramMap.put(keyValue[0], keyValue[1]);
            }
        }
        return paramMap.get("access_token");
    }

}