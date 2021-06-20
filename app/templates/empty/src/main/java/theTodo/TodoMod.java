package <%= modIdCamel %>;

import com.evacipated.cardcrawl.modthespire.lib.SpireInitializer;

@SuppressWarnings({"unused", "WeakerAccess"})
@SpireInitializer
public class <%= modIdPascal %> {

    public static final String modID = "<%= modIdLower %>";

    public static String makeID(String idText) {
        return modID + ":" + idText;
    }

    public static void initialize() {
        <%= modIdPascal %> thismod = new <%= modIdPascal %>();
    }

}
