import { User } from './models/User';
export enum RideType {
    Carpool,
    Luxury,
    BikeRide
}

export enum TripStatus {
    Requested,
    Assigned,
    InProgress,
    Completed,
    Cancelled
}

export enum PaymentMethodType {
    CreditCard,
    PayPal,
    DigitalWallet
}

export enum NotificationType {
    SMS,
    Email,
    InApp
}

export enum Role {
    Admin,
    User
}