package strategies;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

/**
 * Concrete strategy. Implements payment method using digital wallet.
 */
public class DigitalWallet implements PaymentStrategy {
    private String phoneNumber;
    private String password;
    private boolean signedIn;

    private double methodDiscount = 0.15;

    private final BufferedReader READER = new BufferedReader(new InputStreamReader(System.in));

    private static final Map<String, String> WALLET_DATABASE = new HashMap<>();
    static {
        WALLET_DATABASE.put("hasin023", "0111119999");
        WALLET_DATABASE.put("trixy007", "0188883333");
    }

    /**
     * Collect customer's data.
     */
    @Override
    public void collectPaymentDetails() {
        try {
            while (!signedIn) {
                System.out.print("Enter wallet number: ");
                phoneNumber = READER.readLine();
                System.out.print("Enter password: ");
                password = READER.readLine();
                if (verify()) {
                    System.out.println("Data verification has been successful.");
                } else {
                    System.out.println("Wrong phone number or password!");
                }
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
     * Save customer data for future shopping attempts.
     */
    @Override
    public boolean pay(double paymentAmount) {
        if (signedIn) {
            System.out.println("Paying " + paymentAmount + " using DigitalWallet.");
            return true;
        } else {
            return false;
        }
    }

    private boolean verify() {
        setSignedIn(phoneNumber.equals(WALLET_DATABASE.get(password)));
        return signedIn;
    }

    private void setSignedIn(boolean signedIn) {
        this.signedIn = signedIn;
    }

    @Override
    public String toString() {
        return "Digital Wallet";
    }
}
