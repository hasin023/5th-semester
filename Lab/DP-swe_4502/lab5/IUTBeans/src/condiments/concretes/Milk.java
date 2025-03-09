package condiments.concretes;

import condiments.interfaces.ICondiment;

public class Milk implements ICondiment {

    @Override
    public String getDescription() {
        return "Milk";
    }

    @Override
    public double getCost() {
        return 0.50;
    }
}
