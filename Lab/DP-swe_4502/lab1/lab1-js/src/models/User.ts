import { PaymentMethod } from "../interfaces";

export class User {
    public rating: number = 0;

    constructor(
        public id: string,
        public name: string,
        public preferredPaymentMethod: PaymentMethod,
    ) {
        if (this.constructor == User) {
            throw new Error("User classes can't be instantiated.");
        }
    }

    setRating(rating: number): void {
        this.rating = rating;
    }
}