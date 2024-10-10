package context;

import interfaces.IEncryption;
import strategies.AESMethod;
import strategies.CaesarMethod;
import strategies.DESMethod;

public class EncryptionContext {
    private IEncryption strategy;

    // Method to set the encryption strategy at runtime
    public void setEncryptionStrategy(String encryptionType, Integer shiftKey) {
        switch (encryptionType.toLowerCase()) {
            case "aes":
                this.strategy = new AESMethod();
                break;
            case "des":
                this.strategy = new DESMethod();
                break;
            case "ceasar":
                this.strategy = new CaesarMethod(shiftKey);
                break;
            default:
                throw new IllegalArgumentException("Invalid encryption type");
        }
    }

    public String encryptData(String data) {
        if (strategy == null) {
            throw new IllegalStateException("Encryption strategy not set!");
        }
        return strategy.encrypt(data);
    }

    public String decryptData(String encryptedData) {
        if (strategy == null) {
            throw new IllegalStateException("Encryption strategy not set!");
        }
        return strategy.decrypt(encryptedData);
    }
}
