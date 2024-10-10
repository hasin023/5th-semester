import beverage.interfaces.ICoffee;
import coffeeShop.ConsoleHelper;
import coffeeShop.OrderProcessor;

import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ICoffee order = null;

        ConsoleHelper.printHeader("Welcome to the Coffee Shop!");

        while (true) {
            if (order == null) {
                order = OrderProcessor.selectBeverage(scanner);
            } else {
                ConsoleHelper.printOrderSummary(order.getDescription(), order.getCost());

                ConsoleHelper.printPrompt("Do you want to add a condiment? (y/n)");
                String choice = scanner.nextLine().trim().toLowerCase();

                if (choice.equals("y")) {
                    order = OrderProcessor.addCondiment(scanner, order);
                } else if (choice.equals("n")) {
                    break;
                } else {
                    ConsoleHelper.printError("Invalid choice. Please enter 'y' or 'n'.");
                }
            }
        }

        ConsoleHelper.printFinalOrder(order.getDescription(), order.getCost());
    }
}