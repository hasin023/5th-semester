package beverage.interfaces;

import condiments.interfaces.ICondiment;

public interface ICoffee {
    String getDescription();

    double getCost();

    ICoffee add(ICondiment condiment);
}
