public class Rider extends User {
    private String location;
    private PaymentMethodType preferredPaymentMethod;

    public Rider(String id, String name) {
        super(id, name);
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public PaymentMethodType getPreferredPaymentMethod() {
        return preferredPaymentMethod;
    }

    public void setPreferredPaymentMethod(PaymentMethodType preferredPaymentMethod) {
        this.preferredPaymentMethod = preferredPaymentMethod;
    }

    public Trip requestRide(String pickupLocation, String dropOffLocation, RideType rideType) {
        Trip newTrip = new Trip(this, rideType);
        newTrip.setPickupLocation(pickupLocation);
        newTrip.setDropOffLocation(dropOffLocation);

        return newTrip;
    }

    public void rateDriver(Driver driver, double rating) {
        driver.setRating(rating);
    }

    public void makePayment(Trip trip) {
        System.out.println("Payment made for trip: " + trip.getId() + " via " + preferredPaymentMethod);
    }

    @Override
    public void receiveNotification(String message) {
        System.out.println("Notification for rider " + getName() + ": " + message);
    }
}