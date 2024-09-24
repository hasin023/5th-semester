package initializers;

public class MiniUberRider {

    public boolean initialize() {
        System.out.println("Welcome back Rider!");
        System.out.print("Enter username: ");
        String username = System.console().readLine();
        System.out.print("Enter password: ");
        String password = new String(System.console().readPassword());

        boolean loggedIn = login(username, password);

        return loggedIn;
    }

    public boolean login(String username, String password) {
        if (username.equals("rider") && password.equals("rider")) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Login failed!");
            return false;
        }

        return true;
    }

    public void printMenu() {
        System.out.println("1. Book a ride");
        System.out.println("2. View ride history");
        System.out.println("3. Logout");
    }
}
