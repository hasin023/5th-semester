package coffeeShop;

import beverage.interfaces.ICoffee;
import condiments.interfaces.ICondiment;

import java.util.Map;
import java.util.Scanner;

public class OrderProcessor {
    public static ICoffee selectBeverage(Scanner scanner) {
        ConsoleHelper.printHeader("Select a beverage");
        Map<Integer, ICoffee> beverages = CoffeeShopMenu.getBeverages();
        for (Map.Entry<Integer, ICoffee> entry : beverages.entrySet()) {
            ConsoleHelper.printMenuItem(entry.getKey(), entry.getValue().getDescription(), entry.getValue().getCost());
        }

        while (true) {
            System.out.println();
            ConsoleHelper.printPrompt("Enter the number of your choice");
            try {
                int choice = Integer.parseInt(scanner.nextLine().trim());
                if (beverages.containsKey(choice)) {
                    return beverages.get(choice);
                } else {
                    ConsoleHelper.printError("Invalid choice. Please try again.");
                }
            } catch (NumberFormatException e) {
                ConsoleHelper.printError("Invalid input. Please enter a number.");
            }
        }
    }

    public static ICoffee addCondiment(Scanner scanner, ICoffee coffee) {
        ConsoleHelper.printHeader("Select a condiment to add");
        Map<Integer, ICondiment> condiments = CoffeeShopMenu.getCondiments();
        for (Map.Entry<Integer, ICondiment> entry : condiments.entrySet()) {
            ConsoleHelper.printMenuItem(entry.getKey(), entry.getValue().getDescription(), entry.getValue().getCost());
        }

        while (true) {
            ConsoleHelper.printPrompt("Enter the number of your choice");
            try {
                int choice = Integer.parseInt(scanner.nextLine().trim());
                if (condiments.containsKey(choice)) {
                    return coffee.add(condiments.get(choice));
                } else {
                    ConsoleHelper.printError("Invalid choice. Please try again.");
                }
            } catch (NumberFormatException e) {
                ConsoleHelper.printError("Invalid input. Please enter a number.");
            }
        }
    }
}