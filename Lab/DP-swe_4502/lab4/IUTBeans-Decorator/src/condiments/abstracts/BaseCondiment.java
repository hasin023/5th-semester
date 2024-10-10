package condiments.abstracts;

import condiments.interfaces.ICondiment;

public abstract class BaseCondiment implements ICondiment {
    private ICondiment next;

    public BaseCondiment(ICondiment next) {
        this.next = next;
    }
    @Override
    public ICondiment getNext() {
        return next;
    }
    @Override
    public void setNext(ICondiment condiment) {
        this.next = condiment;
    }
}
