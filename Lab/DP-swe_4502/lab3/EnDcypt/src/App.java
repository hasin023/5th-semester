import helpers.FileHandler;
import helpers.Initializer;
import interfaces.IEncryption;

public class App {
    // ANSI color codes for styling
    private static final String RESET = "\u001B[0m";
    private static final String RED = "\u001B[31m";
    private static final String GREEN = "\u001B[32m";
    // private static final String BLUE = "\u001B[34m";
    private static final String YELLOW = "\u001B[33m";
    private static final String CYAN = "\u001B[36m";
    private static final String PURPLE = "\u001B[35m";

    public static void main(String[] args) throws Exception {
        boolean session = true;
        IEncryption encryption;
        Initializer initializer = new Initializer();

        System.out.println();
        System.out.println();
        System.out.println(CYAN + "                       Welcome to the EnDcypt" + RESET);

        while (session) {
            int choice = initializer.encryptionChoice();
            encryption = initializer.initializeEncryption(choice);

            if (encryption == null && choice != 7) {
                System.out.println(RED + "\nInvalid choice! Please try again." + RESET);
                continue;
            }

            switch (choice) {
                case 1:
                case 2:
                case 3:
                    System.out
                            .println(PURPLE + "\n[" + encryption.getEncryptionName() + "] Encryption selected" + RESET);
                    String textToEncrypt = FileHandler.ReadFile("inputs/toEncrypt.txt");
                    System.out.println(YELLOW + "Text to encrypt: " + RESET + textToEncrypt);

                    String encryptedText = encryption.encrypt(textToEncrypt);
                    System.out.println(GREEN + "Encrypted text: " + RESET + encryptedText);
                    break;

                case 4:
                case 5:
                case 6:
                    System.out
                            .println(PURPLE + "\n[" + encryption.getEncryptionName() + "] Decryption selected" + RESET);
                    String textToDecrypt = FileHandler.ReadFile("outputs/encryptResult.txt");
                    System.out.println(YELLOW + "Text to decrypt: " + RESET + textToDecrypt);

                    String decryptedText = encryption.decrypt(textToDecrypt);
                    System.out.println(GREEN + "Decrypted text: " + RESET + decryptedText);
                    break;

                case 7:
                    session = false;
                    System.out.println(CYAN + "\nKeep your secrets safe! Goodbye!" + RESET);
                    break;

                default:
                    System.out.println(RED + "\nInvalid choice! Please try again." + RESET);
                    break;
            }

            System.out.println(CYAN + "-------------------------------------------------------------------" + RESET);
        }
    }
}
