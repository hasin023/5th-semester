package helpers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import context.EncryptionContext;

import java.io.IOException;
import java.io.OutputStream;

public class EncryptHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            String requestBody = new String(exchange.getRequestBody().readAllBytes());

            // Extract data, encryptionType, and shiftKey (if applicable) from the request
            // body
            String[] parts = requestBody.split(",");
            String data = parts[0].split(":")[1].replace("\"", "").trim();
            String encryptionType = parts[1].split(":")[1].replace("\"", "").trim();
            Integer shiftKey = encryptionType.equalsIgnoreCase("ceasar")
                    ? Integer.parseInt(parts[2].split(":")[1].replace("\"", "").replace("}", "").trim())
                    : null;

            // Set the encryption strategy based on the type and shiftKey
            EncryptionContext context = new EncryptionContext();
            context.setEncryptionStrategy(encryptionType, shiftKey);

            String encryptedData = context.encryptData(data);

            // Respond to the client
            String response = "{\"encryptedData\":\"" + encryptedData + "\"}";
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } else {
            exchange.sendResponseHeaders(405, -1); // Method Not Allowed
        }
    }
}
