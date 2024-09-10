public class Champion {
    public String name;
    public int level;
    public double health;
    public double mana;
    public Ability[] abilities;

    public Champion(String name, int level, double health, double mana, Ability[] abilities) {
        this.name = name;
        this.level = level;
        this.health = health;
        this.mana = mana;
        this.abilities = abilities;
    }

    public void castAbility(int index) {
        if (index < 0 || index >= this.abilities.length) {
            System.out.println("Invalid ability index");
            return;
        }

        Ability ability = this.abilities[index];
        ability.cast(this.mana);
    }

    public void levelUp() {
        this.level++;
        System.out.println(this.name + " leveled up to " + this.level);
    }

}
