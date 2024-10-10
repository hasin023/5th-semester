import beverage.concretes.Latte;
import beverage.interfaces.ICoffee;
import condiments.concretes.Hazelnut;
import condiments.concretes.Milk;

public class App {
    public static void main(String[] args) {
        ICoffee coffee = new Latte();
        System.out.println();
        System.out.println("Base Order -> " + coffee.getDescription());

        System.out.println("Adding condiments to the coffee...");
        coffee.add(new Hazelnut(new Milk(new Milk(null))));

        System.out.println();
        System.out.println("Final Order -> " + coffee.getDescription());
        System.out.println("Price -> $" + coffee.getCost());
        System.out.println("Thank you for your order!");
        System.out.println();
    }
}