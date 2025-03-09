package beverage.asbtracts;

import beverage.interfaces.ICoffee;
import condiments.interfaces.ICondiment;
import java.util.ArrayList;
import java.util.List;

public abstract class BaseCoffee implements ICoffee {
    private List<ICondiment> condiments = new ArrayList<>();

    @Override
    public ICoffee add(ICondiment condiment) {
        condiments.add(condiment);
        return this;
    }

    @Override
    public String getDescription() {
        StringBuilder description = new StringBuilder(getBaseName());
        for (ICondiment condiment : condiments) {
            description.append(", ").append(condiment.getDescription());
        }
        return description.toString();
    }

    @Override
    public double getCost() {
        return getBaseCost() + condiments.stream()
                .mapToDouble(ICondiment::getCost)
                .sum();
    }

    protected abstract String getBaseName();

    protected abstract double getBaseCost();
}