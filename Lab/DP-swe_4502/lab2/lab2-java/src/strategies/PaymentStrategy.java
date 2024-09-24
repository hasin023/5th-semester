package strategies;

public interface PaymentStrategy {

    boolean pay(double paymentAmount);

    double calculateFare(double fare);

    void collectPaymentDetails();

}
