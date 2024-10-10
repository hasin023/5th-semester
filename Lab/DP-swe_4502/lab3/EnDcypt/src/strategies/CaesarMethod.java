package strategies;

import helpers.FileHandler;
import interfaces.IEncryption;

public class CaesarMethod implements IEncryption {
    private int shiftKey;

    public CaesarMethod(int shiftKey) {
        if (shiftKey < 0 || shiftKey > 25) {
            throw new IllegalArgumentException("Shift key must be between 0 and 25");
        }
        this.shiftKey = shiftKey;
    }

    @Override
    public String encrypt(String data) {
        StringBuilder result = new StringBuilder();
        for (char character : data.toCharArray()) {
            if (Character.isLetter(character)) {
                char base = Character.isUpperCase(character) ? 'A' : 'a';
                result.append((char) ((character - base + shiftKey) % 26 + base));
            } else {
                result.append(character);
            }
        }
        String encryptedData = result.toString();
        FileHandler.WriteFile("outputs/encryptResult.txt", encryptedData);
        return encryptedData;
    }

    @Override
    public String decrypt(String encryptedData) {
        StringBuilder result = new StringBuilder();
        for (char character : encryptedData.toCharArray()) {
            if (Character.isLetter(character)) {
                char base = Character.isUpperCase(character) ? 'A' : 'a';
                result.append((char) ((character - base - shiftKey + 26) % 26 + base));
            } else {
                result.append(character);
            }
        }
        String decryptedData = result.toString();
        FileHandler.WriteFile("outputs/decryptResult.txt", decryptedData);
        return decryptedData;
    }

    @Override
    public String getEncryptionName() {
        return "Caesar Cipher";
    }
}
