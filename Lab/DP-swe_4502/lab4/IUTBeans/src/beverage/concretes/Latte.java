package beverage.concretes;

import beverage.asbtracts.BaseCoffee;

public class Latte extends BaseCoffee {
    @Override
    protected String getBaseName() {
        return "Latte";
    }

    @Override
    protected double getBaseCost() {
        return 2.49;
    }
}
