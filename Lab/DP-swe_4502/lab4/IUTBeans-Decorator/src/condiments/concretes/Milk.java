package condiments.concretes;

import condiments.abstracts.BaseCondiment;
import condiments.interfaces.ICondiment;

public class Milk extends BaseCondiment {
    public Milk(ICondiment next) {
        super(next);
    }

    @Override
    public String getDescription() {
        return "Milk";
    }

    @Override
    public double getCost() {
        return 0.50;
    }
}