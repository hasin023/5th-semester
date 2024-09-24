package models;

import java.util.UUID;

import enums.RideType;
import enums.TripStatus;

public class Trip {
    private String id;
    private String pickupLocation;
    private String dropOffLocation;
    private RideType rideType;
    private TripStatus status;
    private double fare;
    private double distance;
    private Rider rider;
    private Driver driver;

    public Trip(Rider rider, RideType rideType) {
        this.id = UUID.randomUUID().toString();
        this.rider = rider;
        this.rideType = rideType;
        this.status = TripStatus.REQUESTED;
    }

    public double calculatedTripFare() {
        // This is based on the ride type, trip distance, and other factors
        return 1000;
    }

    public void assignDriver(Driver driver) {
        this.driver = driver;
        this.status = TripStatus.ASSIGNED;

        driver.receiveNotification("Trip assigned: " + id);
        rider.receiveNotification("Driver assigned: " + driver.getName());
    }

    public void completeTrip() {
        this.status = TripStatus.COMPLETED;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDropOffLocation() {
        return dropOffLocation;
    }

    public void setDropOffLocation(String dropOffLocation) {
        this.dropOffLocation = dropOffLocation;
    }

    public RideType getRideType() {
        return rideType;
    }

    public TripStatus getStatus() {
        return status;
    }

    public void setStatus(TripStatus status) {
        this.status = status;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public Rider getRider() {
        return rider;
    }

    public Driver getDriver() {
        return driver;
    }
}