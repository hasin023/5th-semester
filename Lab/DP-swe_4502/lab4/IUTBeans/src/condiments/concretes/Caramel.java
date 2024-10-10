package condiments.concretes;

import condiments.interfaces.ICondiment;

public class Caramel implements ICondiment {

    @Override
    public String getDescription() {
        return "Caramel";
    }

    @Override
    public double getCost() {
        return 0.75;
    }

}
