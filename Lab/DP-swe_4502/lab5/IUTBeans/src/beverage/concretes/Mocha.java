package beverage.concretes;

import beverage.asbtracts.BaseCoffee;

public class Mocha extends BaseCoffee {
    @Override
    protected String getBaseName() {
        return "Mocha";
    }

    @Override
    protected double getBaseCost() {
        return 2.99;
    }

}
