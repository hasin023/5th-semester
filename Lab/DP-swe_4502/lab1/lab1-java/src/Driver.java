public class Driver extends User {
    private String vehicleType;
    private String location;
    private boolean isAvailable = true;

    public Driver(String id, String name) {
        super(id, name);
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public void acceptRide(Trip trip) {
        if (isAvailable) {
            trip.assignDriver(this);
            System.out.println("Driver " + getName() + " accepted the trip request.");
            setAvailable(false);
        }

    }

    public void cancelRide(Trip trip) {
        trip.setStatus(TripStatus.CANCELLED);
        System.out.println("Driver " + getName() + " cancelled the trip.");
        setAvailable(true);
    }

    public void rateRider(Rider rider, double rating) {
        rider.setRating(rating);
    }

    public void updateLocation(String newLocation) {
        this.location = newLocation;
    }

    @Override
    public void receiveNotification(String message) {
        System.out.println("Notification for driver " + getName() + ": " + message);
    }
}