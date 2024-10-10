package helpers;

import interfaces.IEncryption;
import java.util.Scanner;

public class Initializer {
    private Scanner scanner;

    private static final String RESET = "\u001B[0m";
    private static final String RED = "\u001B[31m";
    private static final String GREEN = "\u001B[32m";
    private static final String BLUE = "\u001B[34m";
    private static final String YELLOW = "\u001B[33m";
    private static final String CYAN = "\u001B[36m";
    // private static final String WHITE_BG = "\u001B[47m";
    // private static final String BLACK_TEXT = "\u001B[30m";

    public Initializer() {
        this.scanner = new Scanner(System.in);
    }

    // Method to print a colorful header
    private void printHeader() {
        System.out.println(CYAN + "*******************************************************************" + RESET);
        System.out.println(CYAN + "*                         ENCRYPTION MENU                         *" + RESET);
        System.out.println(CYAN + "*******************************************************************" + RESET);
    }

    // Method to print the operation choices with more styling
    public int encryptionChoice() {
        printHeader(); // Print the header
        System.out.println(BLUE + "  1. AES Encryption" + RESET);
        System.out.println(BLUE + "  2. DES Encryption" + RESET);
        System.out.println(BLUE + "  3. Caesar Encryption" + RESET);
        System.out.println(RED + "  4. AES Decryption" + RESET);
        System.out.println(RED + "  5. DES Decryption" + RESET);
        System.out.println(RED + "  6. Caesar Decryption" + RESET);
        System.out.println(YELLOW + "  7. Exit" + RESET);
        System.out.println(CYAN + "-------------------------------------------------------------------" + RESET);
        System.out.print(GREEN + "\nChoose Operation: " + RESET);

        int choice = Integer.parseInt(scanner.nextLine());
        System.out.println(); // Add an empty line for spacing
        return choice;
    }

    // Method to initialize the encryption based on the choice
    public IEncryption initializeEncryption(int choice) {
        IEncryption encryption = null;

        switch (choice) {
            case 1:
            case 4:
                encryption = new strategies.AESMethod();
                break;
            case 2:
            case 5:
                encryption = new strategies.DESMethod();
                break;
            case 3:
            case 6:
                int shiftKey = 2;
                encryption = new strategies.CaesarMethod(shiftKey);
                break;
            default:
                break;
        }

        return encryption;
    }
}
