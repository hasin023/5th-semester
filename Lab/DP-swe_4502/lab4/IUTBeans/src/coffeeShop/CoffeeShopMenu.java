package coffeeShop;

import beverage.concretes.*;
import condiments.concretes.*;

import beverage.interfaces.ICoffee;
import condiments.interfaces.ICondiment;

import java.util.HashMap;
import java.util.Map;

public class CoffeeShopMenu {
    private static final Map<Integer, ICoffee> beverages = new HashMap<>();
    private static final Map<Integer, ICondiment> condiments = new HashMap<>();

    static {
        beverages.put(1, new Espresso());
        beverages.put(2, new Latte());
        beverages.put(3, new Cappuccino());
        beverages.put(4, new Mocha());
        beverages.put(5, new Macchiato());
        beverages.put(6, new Americano());

        condiments.put(1, new Milk());
        condiments.put(2, new Sugar());
        condiments.put(3, new Cream());
        condiments.put(4, new Vanilla());
        condiments.put(5, new Caramel());
        condiments.put(6, new Hazelnut());
    }

    public static Map<Integer, ICoffee> getBeverages() {
        return beverages;
    }

    public static Map<Integer, ICondiment> getCondiments() {
        return condiments;
    }
}