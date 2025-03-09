package beverage.concretes;

import beverage.asbtracts.BaseCoffee;

public class Macchiato extends BaseCoffee {
    @Override
    protected String getBaseName() {
        return "Macchiato";
    }

    @Override
    protected double getBaseCost() {
        return 2.49;
    }

}
