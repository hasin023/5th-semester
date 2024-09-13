import { User } from './User';
import { Location, PaymentMethod } from '../interfaces';
import { RideType } from '../enums';
import { Driver } from './Driver';
import { Trip } from './Trip';

export class Rider extends User {
    constructor(
        id: string,
        name: string,
        preferredPaymentMethod: PaymentMethod,
        public location: Location
    ) {
        super(id, name, preferredPaymentMethod);
        this.setRating(4.1)
    }

    requestRide(pickup: Location, dropoff: Location, rideType: RideType): Trip {
        const trip = new Trip(this, rideType);
        trip.setPickUpLocation(pickup);
        trip.setDropOffLocation(dropoff);

        return trip;
    }

    rateDriver(driver: Driver, rating: number): void {
        driver.rating = rating;
    }

    makePayment(amount: number): boolean {
        return this.preferredPaymentMethod.processPayment(amount);
    }
}