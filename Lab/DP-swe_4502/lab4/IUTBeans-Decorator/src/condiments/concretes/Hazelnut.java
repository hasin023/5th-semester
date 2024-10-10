package condiments.concretes;

import condiments.abstracts.BaseCondiment;
import condiments.interfaces.ICondiment;

public class Hazelnut extends BaseCondiment {
    public Hazelnut(ICondiment next) {
        super(next);
    }

    @Override
    public String getDescription() {
        return "Hazelnut";
    }

    @Override
    public double getCost() {
        return 0.50;
    }
}