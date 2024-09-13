import { PaymentMethodType } from "./enums";

export interface Location {
    latitude: number;
    longitude: number;
}

export interface PaymentMethod {
    type: PaymentMethodType;
    processPayment(amount: number): boolean;
}