package helpers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import context.EncryptionContext;

import java.io.IOException;
import java.io.OutputStream;

public class DecryptHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            String requestBody = new String(exchange.getRequestBody().readAllBytes());

            // Extract encryptedData, encryptionType, and shiftKey (if applicable) from the
            // request body
            String[] parts = requestBody.split(",");
            String encryptedData = parts[0].split(":")[1].replace("\"", "").trim();
            String encryptionType = parts[1].split(":")[1].replace("\"", "").trim();
            Integer shiftKey = encryptionType.equalsIgnoreCase("ceasar")
                    ? Integer.parseInt(parts[2].split(":")[1].replace("\"", "").replace("}", "").trim())
                    : null;

            // Set the decryption strategy based on the type and shiftKey
            EncryptionContext context = new EncryptionContext();
            context.setEncryptionStrategy(encryptionType, shiftKey);

            String decryptedData = context.decryptData(encryptedData);

            // Respond to the client
            String response = "{\"decryptedData\":\"" + decryptedData + "\"}";
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } else {
            exchange.sendResponseHeaders(405, -1); // Method Not Allowed
        }
    }
}
