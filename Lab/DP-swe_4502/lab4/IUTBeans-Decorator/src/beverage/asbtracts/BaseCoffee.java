package beverage.asbtracts;

import beverage.interfaces.ICoffee;
import condiments.interfaces.ICondiment;

public abstract class BaseCoffee implements ICoffee {
    protected ICondiment condiments;

    @Override
    public ICoffee add(ICondiment condiment) {
        if (this.condiments == null) {
            this.condiments = condiment;
        } else {
            ICondiment last = this.condiments;
            while (last.getNext() != null) {
                last = last.getNext();
            }
            last.setNext(condiment);
        }

        return this;
    }

    @Override
    public String getDescription() {
        StringBuilder description = new StringBuilder(getBaseName());
        ICondiment current = condiments;
        while (current != null) {
            description.append(", ").append(current.getDescription());
            current = current.getNext();
        }

        return description.toString();
    }

    @Override
    public double getCost() {
        double cost = getBaseCost();
        ICondiment current = condiments;
        while (current != null) {
            cost += current.getCost();
            current = current.getNext();
        }

        return cost;
    }

    protected abstract String getBaseName();

    protected abstract double getBaseCost();
}