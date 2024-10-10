package condiments.concretes;

import condiments.interfaces.ICondiment;

public class Vanilla implements ICondiment {

    @Override
    public String getDescription() {
        return "Vanilla";
    }

    @Override
    public double getCost() {
        return 0.75;
    }

}
