package <%= modIdCamel %>.relics;

import <%= modIdCamel %>.TheTodo;

import static <%= modIdCamel %>.<%= modIdPascal %>.makeID;

public class TodoItem extends AbstractEasyRelic {
    public static final String ID = makeID("TodoItem");

    public TodoItem() {
        super(ID, RelicTier.STARTER, LandingSound.FLAT, TheTodo.Enums.TODO_COLOR);
    }
}
