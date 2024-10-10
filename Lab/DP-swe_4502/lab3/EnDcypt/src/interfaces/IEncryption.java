package interfaces;

public interface IEncryption {

    public String encrypt(String data);

    public String decrypt(String encryptedData);

    public String getEncryptionName();
}
