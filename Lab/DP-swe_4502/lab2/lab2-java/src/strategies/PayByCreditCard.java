package strategies;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Concrete strategy. Implements credit card payment method.
 */
public class PayByCreditCard implements PaymentStrategy {

    private String number;
    private String date;
    private String cvv;
    private boolean verified;

    private double methodDiscount = 0.05;

    private final BufferedReader READER = new BufferedReader(new InputStreamReader(System.in));

    private static final Map<String, ArrayList<String>> CARD_DATABASE = new HashMap<String, ArrayList<String>>();

    static {
        ArrayList<String> card1 = new ArrayList<String>();
        card1.add("1234 5678 9012 3456");
        card1.add("12/2024");
        card1.add("123");
        CARD_DATABASE.put("1234 5678 9012 3456", card1);

        ArrayList<String> card2 = new ArrayList<String>();
        card2.add("9876 5432 1098 7654");
        card2.add("11/2023");
        card2.add("987");
        CARD_DATABASE.put("9876 5432 1098 7654", card2);
    }

    /**
     * Collect credit card data.
     */
    @Override
    public void collectPaymentDetails() {
        try {
            System.out.print("Enter the card number: ");
            String number = READER.readLine();
            System.out.print("Enter the card expiration date 'mm/yy': ");
            String date = READER.readLine();
            System.out.print("Enter the CVV code: ");
            String cvv = READER.readLine();

            // Verify credit card data
            if (verify()) {
                System.out.println("Data verification has been successful.");
                System.out.println("Number -> " + number + ", Date -> " + date + ", CVV -> " + cvv);
            } else {
                System.out.println("Wrong credit card data!");
            }

        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * Calculate fare after discount for the payment method.
     */
    @Override
    public double calculateFare(double fare) {
        return fare - (fare * methodDiscount);
    }

    /**
     * After card validation we can charge customer's credit card.
     */
    @Override
    public boolean pay(double paymentAmount) {
        if (verified) {
            System.out.println("Paying " + paymentAmount + " using credit card.");
            return true;
        } else {
            return false;
        }
    }

    private boolean verify() {
        setVerified(number.equals(CARD_DATABASE.get(number).get(0)) && date.equals(CARD_DATABASE.get(number).get(1))
                && cvv.equals(CARD_DATABASE.get(number).get(2)));
        return verified;
    }

    private void setVerified(boolean verified) {
        this.verified = verified;
    }

    @Override
    public String toString() {
        return "Credit Card";
    }

}
