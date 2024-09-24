package models;

public class Admin extends User {
    private String role;

    public Admin(String id, String name) {
        super(id, name);
        this.role = "admin";
    }

    public String getRole() {
        return role;
    }

    public void manageDriver(Driver driver) {
        System.out.println("Driver managed by admin: " + driver.getName());
    }

    public void manageRider(Rider rider) {
        System.out.println("Rider managed by admin: " + rider.getName());
    }

    public void viewTripHistory() {
        System.out.println("Viewing trip history...");
    }

    public void handleDispute(Trip trip) {
        System.out.println("Dispute handled for trip: " + trip.getId());
    }

    @Override
    public void receiveNotification(String message) {
        System.out.println("Notification for admin " + getName() + ": " + message);
    }
}