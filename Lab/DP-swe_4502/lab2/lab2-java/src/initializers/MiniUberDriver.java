package initializers;

public class MiniUberDriver {

    public boolean initialize() {
        System.out.println("Welcome Driver!");
        System.out.print("Enter username: ");
        String username = System.console().readLine();
        System.out.print("Enter password: ");
        String password = new String(System.console().readPassword());

        boolean loggedIn = login(username, password);

        return loggedIn;
    }

    public boolean login(String username, String password) {
        if (username.equals("driver") && password.equals("driver")) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Login failed!");
            return false;
        }

        return true;
    }

    public void printMenu() {
        System.out.println("1. Start a ride");
        System.out.println("2. End a ride");
        System.out.println("3. View ride history");
        System.out.println("4. Logout");
    }
}