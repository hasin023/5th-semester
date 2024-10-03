package initializers;

import java.util.UUID;
import models.Rider;
import strategies.DigitalWallet;
import strategies.PayByCreditCard;
import strategies.PayByPayPal;
import strategies.PaymentStrategy;

public class MiniUberRider {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_RED = "\u001B[31m";

    public Rider initializeRider() {
        System.out.println(ANSI_CYAN + "\n" +
                "╔═══════════════════════════════╗\n" +
                "║     Welcome back, Rider!      ║\n" +
                "╚═══════════════════════════════╝" + ANSI_RESET);
        System.out.print(ANSI_YELLOW + "Enter username: " + ANSI_RESET);
        String username = System.console().readLine();
        System.out.print(ANSI_YELLOW + "Enter password: " + ANSI_RESET);
        String password = new String(System.console().readPassword());
        boolean loggedIn = login(username, password);
        if (loggedIn) {
            return new Rider(UUID.randomUUID().toString(), username);
        }
        return null;
    }

    public boolean login(String username, String password) {
        if (username.equals("rider") && password.equals("rider")) {
            System.out.println(ANSI_GREEN + "\nLogin successful!" + ANSI_RESET);
        } else {
            System.out.println(ANSI_RED + "\nLogin failed!" + ANSI_RESET);
            return false;
        }
        return true;
    }

    public void printMenu() {
        System.out.println(ANSI_CYAN + "\n" +
                "╔═══════════════════════════════╗\n" +
                "║         Rider Menu            ║\n" +
                "╚═══════════════════════════════╝" + ANSI_RESET);
        System.out.println(ANSI_YELLOW + "1. Book a ride");
        System.out.println("2. View ride history");
        System.out.println("3. Set Preferred Payment Method");
        System.out.println("4. View Preferred Payment Method");
        System.out.println("5. Logout" + ANSI_RESET);
        System.out.println(ANSI_CYAN + "═══════════════════════════════" + ANSI_RESET);
    }

    public int menuInput() {
        System.out.print(ANSI_GREEN + "Enter choice: " + ANSI_RESET);
        String choice = System.console().readLine();
        int menuChoice = Integer.parseInt(choice);
        return menuChoice;
    }

    public Rider logout() {
        return null;
    }

    public void rideType() {
        System.out.println(ANSI_CYAN + "\n" +
                "╔═══════════════════════════════╗\n" +
                "║         Ride Types            ║\n" +
                "╚═══════════════════════════════╝" + ANSI_RESET);
        System.out.println(ANSI_YELLOW + "1. Book a ride");
        System.out.println("2. View ride history");
        System.out.println("3. Logout" + ANSI_RESET);
        System.out.println(ANSI_CYAN + "═══════════════════════════════" + ANSI_RESET);
    }

    public PaymentStrategy changePaymentMethod(Rider rider) {
        System.out.println(ANSI_CYAN + "\n" +
                "╔═══════════════════════════════╗\n" +
                "║    Change Payment Method      ║\n" +
                "╚═══════════════════════════════╝" + ANSI_RESET);
        System.out.println(ANSI_YELLOW + "1. PayPal");
        System.out.println("2. Credit Card");
        System.out.println("3. Digital Wallet" + ANSI_RESET);
        System.out.print(ANSI_GREEN + "Choose payment method: " + ANSI_RESET);

        int choice = Integer.parseInt(System.console().readLine());
        PaymentStrategy newStrategy;

        switch (choice) {
            case 1:
                newStrategy = new PayByPayPal();
                System.out.println(ANSI_GREEN + "Payment method changed to PayPal." + ANSI_RESET);
                break;
            case 2:
                newStrategy = new PayByCreditCard();
                System.out.println(ANSI_GREEN + "Payment method changed to Credit Card." + ANSI_RESET);
                break;
            case 3:
                newStrategy = new DigitalWallet();
                System.out.println(ANSI_GREEN + "Payment method changed to Digital Wallet." + ANSI_RESET);
                break;
            default:
                System.out.println(ANSI_RED + "Invalid choice. Keeping the current payment method." + ANSI_RESET);
                return rider.getPrefferedPaymentStrategy();
        }

        rider.setPrefferedPaymentStrategy(newStrategy);
        return newStrategy;
    }
}