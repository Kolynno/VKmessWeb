package itmo.nick.vkmessweb.requests;

import itmo.nick.vkmessweb.data.Data;

public class CheckRequests {
    public static void checkGroupIdAndToken() {
        Data.IS_CORRECT = Data.IS_CORRECT_GROUP_ID && Data.IS_CORRECT_TOKEN;
    }
}