package condiments.interfaces;

public interface ICondiment {
    String getDescription();

    double getCost();

    ICondiment getNext();

    void setNext(ICondiment condiment);

}