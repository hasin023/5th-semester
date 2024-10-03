package models;

import enums.RideType;
import strategies.PaymentStrategy;

public class Rider extends User {
    private String location;
    private PaymentStrategy prefferedPaymentStrategy;

    public Rider(String id, String name) {
        super(id, name);
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
        double tripFare = trip.calculatedTripFare();
        double finalFare = prefferedPaymentStrategy.calculateFare(tripFare);
        prefferedPaymentStrategy.pay(finalFare);
    }

    @Override
    public void receiveNotification(String message) {
        System.out.println("Notification for rider " + getName() + ": " + message);
    }

    // Getters and setters
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public PaymentStrategy getPrefferedPaymentStrategy() {
        return prefferedPaymentStrategy;
    }

    public String getPrefferedPaymentStrategyName() {
        if (prefferedPaymentStrategy == null) {
            return "No payment method selected";
        }

        return prefferedPaymentStrategy.toString();
    }

    public void setPrefferedPaymentStrategy(PaymentStrategy prefferedPaymentStrategy) {
        this.prefferedPaymentStrategy = prefferedPaymentStrategy;
    }
}