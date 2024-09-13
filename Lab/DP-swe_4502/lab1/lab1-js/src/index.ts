import { PaymentMethodType, RideType } from "./enums";
import { Admin } from "./models/Admin";
import { Driver } from "./models/Driver";
import { Rider } from "./models/Rider";

const admin = new Admin("A1", "Sudo_User");

const rider = new Rider("R1", "Hasin", { type: PaymentMethodType.CreditCard, processPayment: (amount) => true }, { latitude: 40.7128, longitude: -74.0060 });

const driver = new Driver("D1", "Mahtab", { type: PaymentMethodType.PayPal, processPayment: (amount) => true }, RideType.Carpool, { latitude: 40.7138, longitude: -74.0070 }, true);

const trip = rider.requestRide({ latitude: 40.7128, longitude: -74.0060 }, { latitude: 40.7484, longitude: -73.9857 }, RideType.Carpool);

console.log(trip);
console.log(driver);
console.log(rider);
console.log(admin);


