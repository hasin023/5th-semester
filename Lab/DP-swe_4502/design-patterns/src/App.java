public class App {
    public static void main(String[] args) throws Exception {

        // Create abilities
        Ability q = new Ability("Q", 100, 10, 50, false, false);
        Ability w = new Ability("W", 200, 15, 75, false, false);
        Ability e = new Ability("E", 150, 12, 60, false, false);
        Ability r = new Ability("R", 300, 30, 100, false, true);

        // Create abilities array
        Ability[] abilities = { q, w, e, r };

        // Create champion
        Champion champion = new Champion("Invoker", 1, 1000, 500, abilities);

        // Cast ability
        champion.castAbility(0);
        champion.castAbility(1);
        champion.castAbility(2);
        champion.castAbility(3);

        // Level up
        champion.levelUp();
    }
}
