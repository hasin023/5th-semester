public class Ability {
    public String name;
    public int damage;
    public double cooldown;
    public double manaCost;
    public boolean isPassive;
    public boolean isUltimate;

    public Ability(String name, int damage, double cooldown, double manaCost, boolean isPassive, boolean isUltimate) {
        this.name = name;
        this.damage = damage;
        this.cooldown = cooldown;
        this.manaCost = manaCost;
        this.isPassive = isPassive;
        this.isUltimate = isUltimate;
    }

    public void cast(double currentMana) {
        if (currentMana < this.manaCost) {
            System.out.println("Not enough mana to cast " + this.name);
            return;
        }

        System.out.println("Casting " + this.name + " dealing " + this.damage + " damage");
    }

}