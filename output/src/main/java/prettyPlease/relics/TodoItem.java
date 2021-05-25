package prettyPlease.relics;

import prettyPlease.TheTodo;

import static prettyPlease.TodoMod.makeID;

public class TodoItem extends AbstractEasyRelic {
    public static final String ID = makeID("TodoItem");

    public TodoItem() {
        super(ID, RelicTier.STARTER, LandingSound.FLAT, TheTodo.Enums.TODO_COLOR);
    }
}
