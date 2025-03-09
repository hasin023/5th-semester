package beverage.concretes;

import beverage.asbtracts.BaseCoffee;

public class Americano extends BaseCoffee {
    @Override
    protected String getBaseName() {
        return "Americano";
    }

    @Override
    protected double getBaseCost() {
        return 1.49;
    }

}
