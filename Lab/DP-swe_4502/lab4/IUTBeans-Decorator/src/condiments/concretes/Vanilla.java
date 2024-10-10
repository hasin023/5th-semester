package condiments.concretes;

import condiments.abstracts.BaseCondiment;
import condiments.interfaces.ICondiment;

public class Vanilla extends BaseCondiment {
    public Vanilla(ICondiment next) {
        super(next);
    }

    @Override
    public String getDescription() {
        return "Vanilla";
    }

    @Override
    public double getCost() {
        return 0.45;
    }
}
