package condiments.concretes;

import condiments.interfaces.ICondiment;

public class Cream implements ICondiment {

    @Override
    public String getDescription() {
        return "Cream";
    }

    @Override
    public double getCost() {
        return 0.45;
    }
}
