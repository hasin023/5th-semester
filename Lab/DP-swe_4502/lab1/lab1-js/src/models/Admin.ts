import { Role } from "../enums";
import { Driver } from "./Driver";


export class Admin {
    public id: string;
    public name: string;
    public role: Role;

    constructor(
        id: string,
        name: string,
    ) {
        this.id = id;
        this.name = name;
        this.role = Role.Admin;
    }

    manageDriver(driver: Driver) {
        // Do some admin stuff
    }

    manageRider() {
        // Do some admin stuff
    }

    viewTripHistory() {
        // Do some admin stuff
    }

    handleDispute() {
        // Do some admin stuff
    }

}