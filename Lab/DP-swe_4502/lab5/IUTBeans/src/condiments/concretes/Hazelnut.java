package condiments.concretes;

import condiments.interfaces.ICondiment;

public class Hazelnut implements ICondiment {

    @Override
    public String getDescription() {
        return "Hazelnut";
    }

    @Override
    public double getCost() {
        return 0.50;
    }

}
