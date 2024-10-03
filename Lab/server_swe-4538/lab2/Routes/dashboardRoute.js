const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, dashboardController.dashboardPage);

// Admin Hotel Routes
router.get("/hotel", authMiddleware, dashboardController.hotelPage);
router.get("/add-hotel", authMiddleware, dashboardController.addHotelPage);
router.post("/add-hotel", authMiddleware, dashboardController.registerHotel);
router.get(
	"/add-rooms/:hotel_id",
	authMiddleware,
	dashboardController.addHotelRoomsPage,
);
router.post(
	"/add-rooms/:hotel_id",
	authMiddleware,
	dashboardController.registerRoomsToHotel,
);
router.get(
	"/view-rooms/:hotel_id",
	authMiddleware,
	dashboardController.hotelRoomsPage,
);
router.get(
	"/update-rooms/:hotel_id",
	authMiddleware,
	dashboardController.updateHotelRoomsPage,
);
router.post(
	"/update-rooms/:hotel_id",
	authMiddleware,
	dashboardController.updateHotelRooms,
);
// Admin Guest Routes
router.get("/guests", authMiddleware, dashboardController.guestsPage);
router.get(
	"/update-guest",
	authMiddleware,
	dashboardController.updateGuestsPage,
);

// Client Routes
router.get("/events", authMiddleware, dashboardController.eventsPage);
router.get(
	"/reserve-event",
	authMiddleware,
	dashboardController.reserveEventPage,
);

router.post(
	"/reserve-event",
	authMiddleware,
	dashboardController.reserveEventRegister,
);

router.get(
	"/event-rooms/:event_id",
	authMiddleware,
	dashboardController.eventRoomsPage,
);

router.get(
	"/event-rooms/:event_id/add-room",
	authMiddleware,
	dashboardController.addRoomsPage,
);

router.post(
	"/add-room/:event_id",
	authMiddleware,
	dashboardController.addExtraRoom,
);

module.exports = router;
