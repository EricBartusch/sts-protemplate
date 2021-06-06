package <%= modIdCamel %>.relics;

<%_ if (createChar) { _%>
    import <%= modIdCamel %>.<%= charName %>;
<%_ } _%>

import static <%= modIdCamel %>.<%= modIdPascal %>.makeID;

public class TodoItem extends AbstractEasyRelic {
    public static final String ID = makeID("TodoItem");

    public TodoItem() {
        super(ID, RelicTier.STARTER, LandingSound.FLAT, <%_ if (createChar) { _%> <%= charName %>.Enums.TODO_COLOR<%_ } else { _%> null<%_ } _%>);
    }
}
