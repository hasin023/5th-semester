package strategies;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

/**
 * Concrete strategy. Implements PayPal payment method.
 */
public class PayByPayPal implements PaymentStrategy {
    private String email;
    private String password;
    private boolean signedIn;

    private double methodDiscount = 0.1;

    private final BufferedReader READER = new BufferedReader(new InputStreamReader(System.in));

    private static final Map<String, String> PAYPAL_DATABASE = new HashMap<>();
    static {
        PAYPAL_DATABASE.put("hasin023", "hasin@yahoo.com");
        PAYPAL_DATABASE.put("trixy007", "trixx@amazon.eu");
    }

    /**
     * Collect customer's data.
     */
    @Override
    public void collectPaymentDetails() {
        try {
            while (!signedIn) {
                System.out.print("Enter your email: ");
                email = READER.readLine();
                System.out.print("Enter password: ");
                password = READER.readLine();
                if (verify()) {
                    System.out.println("Data verification has been successful.");
                } else {
                    System.out.println("Wrong email or password!");
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
            System.out.println("Paying " + paymentAmount + " using PayPal.");
            return true;
        } else {
            return false;
        }
    }

    private boolean verify() {
        setSignedIn(email.equals(PAYPAL_DATABASE.get(password)));
        return signedIn;
    }

    private void setSignedIn(boolean signedIn) {
        this.signedIn = signedIn;
    }

    @Override
    public String toString() {
        return "PayPal";
    }
}
