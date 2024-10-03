import initializers.MiniUberAdmin;
import initializers.MiniUberDriver;
import initializers.MiniUberRider;
import models.Rider;

public class App {
        public static final String ANSI_RESET = "\u001B[0m";
        public static final String ANSI_YELLOW = "\u001B[33m";
        public static final String ANSI_CYAN = "\u001B[36m";
        public static final String ANSI_GREEN = "\u001B[32m";
        public static final String ANSI_RED = "\u001B[31m";

        public static void main(String[] args) throws Exception {
                boolean session = true;

                while (session) {
                        printMainMenu();
                        int choice = Integer.parseInt(System.console().readLine());

                        switch (choice) {
                                case 1:
                                        handleRiderSession();
                                        break;
                                case 2:
                                        handleDriverSession();
                                        break;
                                case 3:
                                        handleAdminSession();
                                        break;
                                case 4:
                                        session = false;
                                        System.out.println(ANSI_YELLOW + "\nThank you for using Mini Uber. Goodbye!"
                                                        + ANSI_RESET);
                                        break;
                                default:
                                        System.out.println(
                                                        ANSI_RED + "\nInvalid choice! Please try again." + ANSI_RESET);
                                        break;
                        }
                }
        }

        private static void printMainMenu() {
                System.out.println(ANSI_CYAN + "\n" +
                                "╔═══════════════════════════════╗\n" +
                                "║     Welcome to Mini Uber!     ║\n" +
                                "╚═══════════════════════════════╝" + ANSI_RESET);
                System.out.println(ANSI_YELLOW + "1. Rider");
                System.out.println("2. Driver");
                System.out.println("3. Admin");
                System.out.println("4. Exit" + ANSI_RESET);
                System.out.print(ANSI_GREEN + "Choose user type: " + ANSI_RESET);
        }

        private static void handleRiderSession() throws Exception {
                MiniUberRider riderInterface = new MiniUberRider();
                Rider loggedIn = riderInterface.initializeRider();

                if (loggedIn != null) {
                        loggedIn.setPrefferedPaymentStrategy(null);
                        boolean riderSession = true;

                        while (riderSession) {
                                riderInterface.printMenu();
                                int menuChoice = riderInterface.menuInput();

                                switch (menuChoice) {
                                        case 1:
                                                System.out.println(ANSI_GREEN + "\nBooked a ride successfully!"
                                                                + ANSI_RESET);
                                                break;
                                        case 2:
                                                System.out.println(ANSI_YELLOW + "\nRide history:" + ANSI_RESET);
                                                System.out.println("No previous rides found.");
                                                break;
                                        case 3:
                                                riderInterface.changePaymentMethod(loggedIn);
                                                break;
                                        case 4:
                                                System.out.println(ANSI_CYAN + "\nCurrent payment method: " +
                                                                loggedIn.getPrefferedPaymentStrategyName()
                                                                + ANSI_RESET);
                                                break;
                                        case 5:
                                                System.out.println(ANSI_YELLOW + "\nLogged Out" + ANSI_RESET);
                                                loggedIn = riderInterface.logout();
                                                riderSession = false;
                                                break;
                                        default:
                                                System.out.println(ANSI_RED + "\nInvalid choice! Please try again."
                                                                + ANSI_RESET);
                                                break;
                                }
                        }
                }
        }

        private static void handleDriverSession() {
                MiniUberDriver driverInterface = new MiniUberDriver();
                System.out.println(ANSI_YELLOW + "\nDriver functionality not implemented yet." + ANSI_RESET);
        }

        private static void handleAdminSession() {
                MiniUberAdmin adminInterface = new MiniUberAdmin();
                System.out.println(ANSI_YELLOW + "\nAdmin functionality not implemented yet." + ANSI_RESET);
        }
}