package services;

import interfaces.INotifiable;

public class NotificationService {
    public static void sendNotification(INotifiable recipient, String message) {
        recipient.receiveNotification(message);
    }
}