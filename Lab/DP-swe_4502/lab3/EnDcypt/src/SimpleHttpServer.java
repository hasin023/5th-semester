import com.sun.net.httpserver.HttpServer;

import helpers.DecryptHandler;
import helpers.EncryptHandler;

import java.net.InetSocketAddress;

public class SimpleHttpServer {

    public static void main(String[] args) throws Exception {
        // Create an HTTP server listening on port 8080
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Create endpoints for encryption and decryption
        server.createContext("/encrypt", new EncryptHandler());
        server.createContext("/decrypt", new DecryptHandler());

        // Start the server
        server.setExecutor(null); // Use the default executor
        server.start();
        System.out.println("Java server is running on port 8080");
    }

}
