package <%= modIdCamel %>;

<%_ if (createRelics || createCards) { _%>
import basemod.AutoAdd;
<%_ } _%>
import basemod.BaseMod;
<%_ if (createRelics) { _%>
import basemod.helpers.RelicType;
<%_ } _%>
import basemod.interfaces.*;
import com.badlogic.gdx.Gdx;
<%_ if (createChar) { _%>import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.math.MathUtils;
<%_ } _%>
import com.evacipated.cardcrawl.mod.stslib.Keyword;
import com.evacipated.cardcrawl.modthespire.lib.SpireInitializer;
import com.google.gson.Gson;
<%_if (createCards) { _%>
import com.megacrit.cardcrawl.localization.CardStrings;
<%_ } _%>
<%_ if (createChar) { _%>
import com.megacrit.cardcrawl.localization.CharacterStrings;
<%_ } _%>
<%_ if (createPowers) { _%>
import com.megacrit.cardcrawl.localization.PowerStrings;
<%_ } _%>
<%_ if (createRelics) { _%>
import com.megacrit.cardcrawl.localization.RelicStrings;
<%_ } _%>
import com.megacrit.cardcrawl.unlock.UnlockTracker;
<%_if (createCards) { _%>
import <%= modIdCamel %>.cards.AbstractEasyCard;
import <%= modIdCamel %>.cards.cardvars.SecondDamage;
import <%= modIdCamel %>.cards.cardvars.SecondMagicNumber;
<%_ } _%>
<%_ if (createRelics) { _%>
import <%= modIdCamel %>.relics.AbstractEasyRelic;
<%_ } _%>
import java.nio.charset.StandardCharsets;

@SuppressWarnings({"unused", "WeakerAccess"})
@SpireInitializer
public class <%= modIdPascal %> implements
        <%_if (createCards) { _%>
        EditCardsSubscriber,
        <%_ } _%>
        <%_ if (createRelics) { _%>
        EditRelicsSubscriber,
        <%_ } _%>
        EditStringsSubscriber,
        EditKeywordsSubscriber<% if (createChar) { %>,
        EditCharactersSubscriber<%_ } _%> {

    public static final String modID = "<%= modIdLower %>";

    public static String makeID(String idText) {
        return modID + ":" + idText;
    }

    <%_ if (createChar) { _%>    
    public static Color characterColor = new Color(MathUtils.random(), MathUtils.random(), MathUtils.random(), 1); // This should be changed eventually

    public static final String SHOULDER1 = modID + "Resources/images/char/mainChar/shoulder.png";
    public static final String SHOULDER2 = modID + "Resources/images/char/mainChar/shoulder2.png";
    public static final String CORPSE = modID + "Resources/images/char/mainChar/corpse.png";
    private static final String ATTACK_S_ART = modID + "Resources/images/512/attack.png";
    private static final String SKILL_S_ART = modID + "Resources/images/512/skill.png";
    private static final String POWER_S_ART = modID + "Resources/images/512/power.png";
    private static final String CARD_ENERGY_S = modID + "Resources/images/512/energy.png";
    private static final String TEXT_ENERGY = modID + "Resources/images/512/text_energy.png";
    private static final String ATTACK_L_ART = modID + "Resources/images/1024/attack.png";
    private static final String SKILL_L_ART = modID + "Resources/images/1024/skill.png";
    private static final String POWER_L_ART = modID + "Resources/images/1024/power.png";
    private static final String CARD_ENERGY_L = modID + "Resources/images/1024/energy.png";
    private static final String CHARSELECT_BUTTON = modID + "Resources/images/charSelect/charButton.png";
    private static final String CHARSELECT_PORTRAIT = modID + "Resources/images/charSelect/charBG.png";

    <%_ } _%>
    public <%= modIdPascal %>() {
        BaseMod.subscribe(this);
        <%_ if (createChar) { _%>
            BaseMod.addColor(TheTodo.Enums.TODO_COLOR, characterColor, characterColor, characterColor,
                characterColor, characterColor, characterColor, characterColor,
                ATTACK_S_ART, SKILL_S_ART, POWER_S_ART, CARD_ENERGY_S,
                ATTACK_L_ART, SKILL_L_ART, POWER_L_ART,
                CARD_ENERGY_L, TEXT_ENERGY);
        <%_ } _%>
    }

    public static String makePath(String resourcePath) {
        return modID + "Resources/" + resourcePath;
    }

    public static String makeImagePath(String resourcePath) {
        return modID + "Resources/images/" + resourcePath;
    }
    <%_ if (createRelics) { _%>

    public static String makeRelicPath(String resourcePath) {
        return modID + "Resources/images/relics/" + resourcePath;
    }
    <%_ } _%>
    <%_ if (createPowers) { _%>

    public static String makePowerPath(String resourcePath) {
        return modID + "Resources/images/powers/" + resourcePath;
    }
    <%_ } _%>
    <%_if (createCards) { _%>

    public static String makeCardPath(String resourcePath) {
        return modID + "Resources/images/cards/" + resourcePath;
    }
    <%_ } _%>

    public static void initialize() {
        <%= modIdPascal %> thismod = new <%= modIdPascal %>();
    }
    <%_ if (createChar) { _%>    

    @Override
    public void receiveEditCharacters() {
        BaseMod.addCharacter(new TheTodo(TheTodo.characterStrings.NAMES[1], TheTodo.Enums.THE_TODO),
                CHARSELECT_BUTTON, CHARSELECT_PORTRAIT, TheTodo.Enums.THE_TODO);
    }

    <%_ } _%>
    <%_ if (createRelics) { _%>
    @Override
    public void receiveEditRelics() {
        new AutoAdd(modID)
                .packageFilter(AbstractEasyRelic.class)
                .any(AbstractEasyRelic.class, (info, relic) -> {
                    if (relic.color == null) {
                        BaseMod.addRelic(relic, RelicType.SHARED);
                    } else {
                        BaseMod.addRelicToCustomPool(relic, relic.color);
                    }
                    if (!info.seen) {
                        UnlockTracker.markRelicAsSeen(relic.relicId);
                    }
                });
    }

    <%_ } _%>
    <%_if (createCards) { _%>
    @Override
    public void receiveEditCards() {
        BaseMod.addDynamicVariable(new SecondMagicNumber());
        BaseMod.addDynamicVariable(new SecondDamage());
        new AutoAdd(modID)
                .packageFilter(AbstractEasyCard.class)
                .setDefaultSeen(true)
                .cards();
    }

    <%_ } _%>

    @Override
    public void receiveEditStrings() {
        <%_if (createCards) { _%>
        BaseMod.loadCustomStringsFile(CardStrings.class, modID + "Resources/localization/eng/Cardstrings.json");

        <%_ } _%>
        <%_ if (createRelics) { _%>
        BaseMod.loadCustomStringsFile(RelicStrings.class, modID + "Resources/localization/eng/Relicstrings.json");

        <%_ } _%>
        <%_ if (createChar) { _%>
        BaseMod.loadCustomStringsFile(CharacterStrings.class, modID + "Resources/localization/eng/Charstrings.json");

        <%_ } _%>
        <%_ if (createPowers) { _%>
        BaseMod.loadCustomStringsFile(PowerStrings.class, modID + "Resources/localization/eng/Powerstrings.json");

        <%_ } _%>
    }

    @Override
    public void receiveEditKeywords() {
        Gson gson = new Gson();
        String json = Gdx.files.internal(modID + "Resources/localization/eng/Keywordstrings.json").readString(String.valueOf(StandardCharsets.UTF_8));
        com.evacipated.cardcrawl.mod.stslib.Keyword[] keywords = gson.fromJson(json, com.evacipated.cardcrawl.mod.stslib.Keyword[].class);

        if (keywords != null) {
            for (Keyword keyword : keywords) {
                BaseMod.addKeyword(modID, keyword.PROPER_NAME, keyword.NAMES, keyword.DESCRIPTION);
            }
        }
    }
}
