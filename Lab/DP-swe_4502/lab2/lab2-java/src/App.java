import initializers.MiniUberAdmin;
import initializers.MiniUberDriver;
import initializers.MiniUberRider;

public class App {
        public static void main(String[] args) throws Exception {
                boolean session = true;
                boolean loggedIn = false;

                while (session && !loggedIn) {
                        System.out.println("Welcome to Mini Uber!");
                        System.out.println("1. Rider");
                        System.out.println("2. Driver");
                        System.out.println("3. Admin");
                        System.out.println("4. Exit");
                        System.out.print("Choose user type: ");
                        int choice = Integer.parseInt(System.console().readLine());

                        switch (choice) {
                                case 1:
                                        MiniUberRider riderInterface = new MiniUberRider();
                                        loggedIn = riderInterface.initialize();

                                        if (loggedIn) {
                                                riderInterface.printMenu();
                                        }

                                        break;
                                case 2:
                                        MiniUberDriver driverInterface = new MiniUberDriver();
                                        loggedIn = driverInterface.initialize();

                                        if (loggedIn) {
                                                driverInterface.printMenu();
                                        }

                                        break;
                                case 3:
                                        MiniUberAdmin adminInterface = new MiniUberAdmin();
                                        loggedIn = adminInterface.initialize();

                                        if (loggedIn) {
                                                adminInterface.printMenu();
                                        }

                                        break;
                                case 4:
                                        session = false;
                                        break;
                                default:
                                        System.out.println("Invalid choice!");
                                        break;
                        }
                }
        }
}
