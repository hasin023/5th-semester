public class App {
        public static void main(String[] args) throws Exception {

                Rider hasin_r88822 = new Rider("UBBY_r88822", "Hasin");
                hasin_r88822.setLocation("Uttara, Dhaka");
                hasin_r88822.setRating(2.7);
                hasin_r88822.setPreferredPaymentMethod(PaymentMethodType.DIGITAL_WALLET);
                System.out.println("Rider: " + hasin_r88822.getName() + ", Location: " + hasin_r88822.getLocation());

                Driver sinthia_d44421 = new Driver("UBBY_d44421", "Sinthia");
                sinthia_d44421.setVehicleType("Corrolla");
                sinthia_d44421.setLocation("Badda, Rampura");
                sinthia_d44421.setRating(3.2);
                System.out.println(
                                "Driver: " + sinthia_d44421.getName() + ", Location: " + sinthia_d44421.getLocation());

                Trip emk_center = hasin_r88822.requestRide("EMK Center, Dhanmondi", "Bashundhara City, Panthapath",
                                RideType.CARPOOL);
                System.out.println("Trip requested: " + emk_center.getId() + ", Rider: " + hasin_r88822.getName()
                                + ", Pickup: "
                                + emk_center.getPickupLocation() + ", Dropoff: " + emk_center.getDropOffLocation());

                sinthia_d44421.cancelRide(emk_center);

                Trip dhanmondi = hasin_r88822.requestRide("Dhanmondi 27", "Bashundhara City, Panthapath",
                                RideType.CARPOOL);
                System.out.println("Trip requested: " + dhanmondi.getId() + ", Rider: " + hasin_r88822.getName()
                                + ", Pickup: "
                                + dhanmondi.getPickupLocation() + ", Dropoff: " + dhanmondi.getDropOffLocation());

                sinthia_d44421.acceptRide(dhanmondi);

                sinthia_d44421.receiveNotification("Trip assigned: " + dhanmondi.getId());
                hasin_r88822.receiveNotification("Driver assigned: " + sinthia_d44421.getName());

                sinthia_d44421.updateLocation("Dhanmondi 27");
                System.out.println("Driver " + sinthia_d44421.getName() + " is at " + sinthia_d44421.getLocation());

                dhanmondi.completeTrip();
                dhanmondi.calculateFare();

                hasin_r88822.makePayment(dhanmondi);
                hasin_r88822.rateDriver(sinthia_d44421, 4.5);

                sinthia_d44421.rateRider(hasin_r88822, 4.0);

                Admin admin = new Admin("UBBY_a00001", "Admin");
                admin.manageDriver(sinthia_d44421);
                admin.manageRider(hasin_r88822);
                admin.viewTripHistory();
                admin.handleDispute(dhanmondi);
        }
}
