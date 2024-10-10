package coffeeShop;

public class ConsoleHelper {
    // ANSI escape codes for colors
    private static final String RESET = "\u001B[0m";
    private static final String RED = "\u001B[31m";
    private static final String GREEN = "\u001B[32m";
    private static final String YELLOW = "\u001B[33m";
    private static final String BLUE = "\u001B[34m";
    private static final String PURPLE = "\u001B[35m";
    private static final String CYAN = "\u001B[36m";

    public static void printHeader(String text) {
        int padding = (69 - text.length()) / 2;
        String paddedText = " ".repeat(padding) + text + " ".repeat(74 - text.length() - padding);
        System.out.println("\n" + PURPLE
                + "╔═══════════════════════════════════════════════════════════════════════════╗" + RESET);
        System.out.println(PURPLE + "║ " + YELLOW + paddedText + PURPLE + "║" + RESET);
        System.out.println(
                PURPLE + "╚═══════════════════════════════════════════════════════════════════════════╝" + RESET);
    }

    public static void printMenuItem(int index, String description, double price) {
        System.out.printf(CYAN + "%d. %-50s $%.2f%n" + RESET, index, description, price);
    }

    public static void printPrompt(String text) {
        System.out.print(GREEN + text + ": " + RESET);
    }

    public static void printError(String text) {
        System.out.println(RED + "Error: " + text + RESET);
    }

    public static void printOrderSummary(String description, double price) {
        System.out.println(BLUE + "Current order: " + RESET + description);
        System.out.printf(BLUE + "Price: " + RESET + "$%.2f%n", price);
    }

    public static void printFinalOrder(String description, double price) {
        printHeader("Final Order");
        System.out.println(YELLOW + "Order: " + RESET + description);
        System.out.printf(YELLOW + "Total price: " + RESET + "$%.2f%n", price);
        System.out.println(GREEN + "Thank you for your order!" + RESET);
        System.out.println();
    }
}