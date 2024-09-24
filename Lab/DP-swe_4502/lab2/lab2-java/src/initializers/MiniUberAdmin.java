package initializers;

public class MiniUberAdmin {

    public boolean initialize() {
        System.out.println("Welcome Admin!");
        System.out.print("Enter username: ");
        String username = System.console().readLine();
        System.out.print("Enter password: ");
        String password = new String(System.console().readPassword());

        boolean loggedIn = login(username, password);

        return loggedIn;
    }

    public boolean login(String username, String password) {
        if (username.equals("admin") && password.equals("admin")) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Login failed!");
            return false;
        }

        return true;
    }

    public void printMenu() {
        System.out.println("1. View all rides");
        System.out.println("2. View all drivers");
        System.out.println("3. View all riders");
        System.out.println("4. Logout");
    }
}
