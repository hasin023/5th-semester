package condiments.concretes;

import condiments.abstracts.BaseCondiment;
import condiments.interfaces.ICondiment;

public class Cream extends BaseCondiment {

    public Cream(ICondiment next) {
        super(next);
    }

    @Override
    public String getDescription() {
        return "Cream";
    }

    @Override
    public double getCost() {
        return 0.45;
    }
}
