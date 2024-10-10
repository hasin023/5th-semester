package strategies;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import helpers.FileHandler;
import interfaces.IEncryption;

public class AESMethod implements IEncryption {
    private SecretKey key;
    private static final int KEY_SIZE = 128;
    private static final int DATA_LENGTH = 128;
    private static final String KEY_FILE = "aes_key.txt";

    public AESMethod() {
        try {
            String savedKey = FileHandler.ReadFile(KEY_FILE);
            if (savedKey != null && !savedKey.isEmpty()) {
                byte[] decodedKey = Base64.getDecoder().decode(savedKey);
                key = new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
            } else {
                KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
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
            byte[] dataInBytes = data.getBytes();
            Cipher encryptionCipher = Cipher.getInstance("AES/GCM/NoPadding");
            encryptionCipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encryptedBytes = encryptionCipher.doFinal(dataInBytes);
            byte[] iv = encryptionCipher.getIV();

            byte[] combined = new byte[iv.length + encryptedBytes.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(encryptedBytes, 0, combined, iv.length, encryptedBytes.length);

            String result = Base64.getEncoder().encodeToString(combined);
            FileHandler.WriteFile("outputs/encryptResult.txt", result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String decrypt(String encryptedData) {
        try {
            byte[] combined = Base64.getDecoder().decode(encryptedData);

            byte[] iv = new byte[12];
            byte[] encryptedBytes = new byte[combined.length - 12];
            System.arraycopy(combined, 0, iv, 0, 12);
            System.arraycopy(combined, 12, encryptedBytes, 0, encryptedBytes.length);

            Cipher decryptionCipher = Cipher.getInstance("AES/GCM/NoPadding");
            GCMParameterSpec spec = new GCMParameterSpec(DATA_LENGTH, iv);
            decryptionCipher.init(Cipher.DECRYPT_MODE, key, spec);
            byte[] decryptedBytes = decryptionCipher.doFinal(encryptedBytes);

            String result = new String(decryptedBytes);
            FileHandler.WriteFile("outputs/decryptResult.txt", result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String getEncryptionName() {
        return "AES";
    }
}