package strategies;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import helpers.FileHandler;
import interfaces.IEncryption;

public class DESMethod implements IEncryption {
    private SecretKey key;
    private static final int KEY_SIZE = 56;
    private static final String KEY_FILE = "des_key.txt";

    public DESMethod() {
        try {
            String savedKey = FileHandler.ReadFile(KEY_FILE);
            if (savedKey != null && !savedKey.isEmpty()) {
                byte[] decodedKey = Base64.getDecoder().decode(savedKey);
                key = new SecretKeySpec(decodedKey, 0, decodedKey.length, "DES");
            } else {
                KeyGenerator keyGenerator = KeyGenerator.getInstance("DES");
                keyGenerator.init(KEY_SIZE);
                key = keyGenerator.generateKey();
                String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
                FileHandler.WriteFile(KEY_FILE, encodedKey);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public String encrypt(String data) {
        try {
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            String encryptedData = Base64.getEncoder().encodeToString(encryptedBytes);
            FileHandler.WriteFile("outputs/encryptResult.txt", encryptedData);
            return encryptedData;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String decrypt(String encryptedData) {
        try {
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);
            String decryptedData = new String(decryptedBytes);
            FileHandler.WriteFile("outputs/decryptResult.txt", decryptedData);
            return decryptedData;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String getEncryptionName() {
        return "DES";
    }

}
