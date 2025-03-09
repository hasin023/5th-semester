package condiments.concretes;

import condiments.interfaces.ICondiment;

public class Sugar implements ICondiment {

    @Override
    public String getDescription() {
        return "Sugar";
    }

    @Override
    public double getCost() {
        return 0.25;
    }
}
