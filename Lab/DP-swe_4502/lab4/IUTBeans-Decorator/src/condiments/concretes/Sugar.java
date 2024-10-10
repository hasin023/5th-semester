package condiments.concretes;

import condiments.abstracts.BaseCondiment;
import condiments.interfaces.ICondiment;

public class Sugar extends BaseCondiment {
    public Sugar(ICondiment next) {
        super(next);
    }

    @Override
    public String getDescription() {
        return "Sugar";
    }

    @Override
    public double getCost() {
        return 0.25;
    }
}