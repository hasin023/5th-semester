package beverage.concretes;

import beverage.asbtracts.BaseCoffee;

public class Cappuccino extends BaseCoffee {
    @Override
    protected String getBaseName() {
        return "Cappuccino";
    }

    @Override
    protected double getBaseCost() {
        return 2.99;
    }

}
