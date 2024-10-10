package beverage.concretes;

import beverage.asbtracts.BaseCoffee;

public class Espresso extends BaseCoffee {
    @Override
    protected String getBaseName() {
        return "Espresso";
    }

    @Override
    protected double getBaseCost() {
        return 1.99;
    }
}