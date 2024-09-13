import { User } from './User';
import { Location, PaymentMethod } from '../interfaces';
import { RideType, TripStatus } from '../enums';
import { Rider } from './Rider';
import { Trip } from './Trip';

export class Driver extends User {
    constructor(
        id: string,
        name: string,
        preferredPaymentMethod: PaymentMethod,
        public vehicleType: RideType,
        public location: Location,
        public availability: boolean
    ) {
        super(id, name, preferredPaymentMethod);
        this.setRating(4.5)
    }

    acceptRide(trip: Trip): boolean {
        if (this.availability) {
            trip.assignDriver(this);
            return true;
        }
        return false;
    }

    rateRider(rider: Rider, rating: number): void {
        rider.rating = rating;
    }

    updateLocation(newLocation: Location): void {
        this.location = newLocation;
    }

    startTrip(trip: Trip): void {
        trip.status = TripStatus.Assigned;
    }
}
