import { RideType, TripStatus } from "../enums";
import { Location } from "../interfaces";
import { Driver } from "./Driver";
import { Rider } from "./Rider";

export class Trip {
    public id: string;
    public status: TripStatus;
    public driver?: Driver;
    public fare: number | undefined;
    public distance: number | undefined;
    public pickupLocation: Location | undefined;
    public dropOffLocation: Location | undefined;

    constructor(
        public rider: Rider,
        public rideType: RideType
    ) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.status = TripStatus.Requested;
        this.calculateFare();
    }

    calculateFare(): number {
        return 0;
    }

    assignDriver(driver: Driver): void {
        this.driver = driver;
        this.status = TripStatus.Assigned;
    }

    completeTrip(trip: Trip): void {
        trip.status = TripStatus.Completed;
    }

    setPickUpLocation(location: Location): void {
        this.pickupLocation = location;
    }

    setDropOffLocation(location: Location): void {
        this.dropOffLocation = location
    }
}