const pool = require("../config/db");
const formidable = require("formidable");

class DashboardController {
	dashboardPage = (req, res) => {
		const { userInfo } = req;

		res.status(200).render("dashboard/index.ejs", {
			title: "Dashboard",
			user: userInfo,
		});
	};

	// Admin Controllers ->

	hotelPage = async (req, res) => {
		const { userInfo } = req;

		try {
			const query = `
            SELECT DISTINCT
            H.*,
                CASE
            WHEN ARH.HOTEL_ID IS NOT NULL THEN TRUE
            ELSE FALSE
            END AS has_rooms_assigned
            FROM
            HOTEL H
            LEFT JOIN
            AVAILABLE_ROOM_PER_HOTEL ARH ON H.HOTEL_ID = ARH.HOTEL_ID;
        `;

			const { rows } = await pool.query(query);

			res.status(200).render("dashboard/hotel.ejs", {
				title: "Hotel",
				user: userInfo,
				hotels: rows,
			});
		} catch (error) {
			console.error(
				"Error fetching hotels with room assignment status:",
				error,
			);
			res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	guestsPage = async (req, res) => {
		const { userInfo } = req;

		const guestQuery = "select * from users where user_type='client'";
		const guestQueryResult = await pool.query(guestQuery);
		const guests = guestQueryResult.rows;

		res.status(200).render("dashboard/guests.ejs", {
			title: "Guests",
			user: userInfo,
			guests: guests,
			error: "",
		});
	};

	updateGuestsPage = async (req, res) => {
		const { userInfo } = req;

		// res.status(200).render('dashboard/update-guests.ejs', {
		//     title: 'Update Guests',
		//     user: userInfo,
		//     error: "",
		// });
	};

	addHotelPage = async (req, res) => {
		const { userInfo } = req;

		res.status(200).render("dashboard/add-hotel.ejs", {
			title: "Add Hotel",
			user: userInfo,
			error: "",
		});
	};

	addHotelRoomsPage = async (req, res) => {
		const { userInfo } = req;
		const { hotel_id } = req.params;

		const hotelQuery = "SELECT * FROM hotel WHERE hotel_id = $1";
		const hotelQueryResult = await pool.query(hotelQuery, [hotel_id]);
		const hotel = hotelQueryResult.rows[0];

		res.status(200).render("dashboard/add-rooms.ejs", {
			title: "Add Rooms",
			user: userInfo,
			error: "",
			hotel: hotel,
		});
	};

	hotelRoomsPage = async (req, res) => {
		const { userInfo } = req;
		const { hotel_id } = req.params;

		try {
			const { rows } = await pool.query("SELECT * FROM GET_HOTEL_ROOMS($1)", [
				hotel_id,
			]);

			res.status(200).render("dashboard/hotel-rooms.ejs", {
				title: "Hotel Rooms",
				user: userInfo,
				hotelId: hotel_id,
				rooms: rows,
			});
		} catch (error) {
			console.error("Error fetching hotel rooms:", error);
			res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	updateHotelRoomsPage = async (req, res) => {
		const { userInfo } = req;
		const { hotel_id } = req.params;

		try {
			const { rows } = await pool.query("SELECT * FROM GET_HOTEL_ROOMS($1)", [
				hotel_id,
			]);

			res.status(200).render("dashboard/update-rooms.ejs", {
				title: "Update Rooms",
				user: userInfo,
				hotelId: hotel_id,
				rooms: rows,
				error: "",
			});
		} catch (error) {
			console.error("Error fetching hotel rooms:", error);
			res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	registerHotel = async (req, res) => {
		const { userInfo } = req;
		const form = new formidable.IncomingForm();

		try {
			const { fields } = await new Promise((resolve, reject) => {
				form.parse(req, (err, fields) => {
					if (err) {
						reject(err);
					} else {
						resolve({ fields });
					}
				});
			});

			const { hotel_name, address, state, zip_code, website, phone } = fields;

			const hotelCheckQuery =
				"SELECT COUNT(*) AS count FROM hotel WHERE hotel_name = $1";
			const hotelExistsResult = await pool.query(hotelCheckQuery, [hotel_name]);
			const hotelExists = hotelExistsResult.rows[0].count > 0;

			console.log(hotelExistsResult.rowCount);

			if (hotelExists) {
				return res.status(400).render("dashboard/add-hotel.ejs", {
					title: "Add Hotel",
					user: userInfo,
					error: "Hotel with this name already exists",
				});
			}

			const createHotelQuery = `CALL CREATE_HOTEL('${hotel_name}', '${address}', '${state}', '${zip_code}', '${website}', '${phone}')`;
			await pool.query(createHotelQuery);

			return res.status(200).redirect("/hotel");
		} catch (error) {
			return res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	registerRoomsToHotel = async (req, res) => {
		const { userInfo } = req;
		const { hotel_id } = req.params;

		const form = new formidable.IncomingForm();

		try {
			const { fields } = await new Promise((resolve, reject) => {
				form.parse(req, (err, fields) => {
					if (err) {
						reject(err);
					} else {
						resolve({ fields });
					}
				});
			});

			const { t_s_room, t_m_room, t_l_room, a_s_room, a_m_room, a_l_room } =
				fields;

			const totalSmallRooms = Number.parseInt(t_s_room);
			const totalMediumRooms = Number.parseInt(t_m_room);
			const totalLargeRooms = Number.parseInt(t_l_room);
			const availableSmallRooms = Number.parseInt(a_s_room);
			const availableMediumRooms = Number.parseInt(a_m_room);
			const availableLargeRooms = Number.parseInt(a_l_room);

			const addHotelRoomsQuery = `CALL CREATE_HOTEL_ROOM('${hotel_id}', '${totalSmallRooms}', '${totalMediumRooms}', '${totalLargeRooms}', '${availableSmallRooms}', '${availableMediumRooms}', '${availableLargeRooms}')`;
			await pool.query(addHotelRoomsQuery);

			return res.status(200).redirect(`/view-rooms/${hotel_id}`);
		} catch (error) {
			return res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	updateHotelRooms = async (req, res) => {
		const { userInfo } = req;
		const { hotel_id } = req.params;

		const form = new formidable.IncomingForm();

		try {
			const { fields } = await new Promise((resolve, reject) => {
				form.parse(req, (err, fields) => {
					if (err) {
						reject(err);
					} else {
						resolve({ fields });
					}
				});
			});

			const {
				t_small_hall_room,
				t_medium_hall_room,
				t_large_hall_room,
				a_small_hall_room,
				a_medium_hall_room,
				a_large_hall_room,
			} = fields;

			const totalSmallRooms = Number.parseInt(t_small_hall_room);
			const totalMediumRooms = Number.parseInt(t_medium_hall_room);
			const totalLargeRooms = Number.parseInt(t_large_hall_room);
			const availableSmallRooms = Number.parseInt(a_small_hall_room);
			const availableMediumRooms = Number.parseInt(a_medium_hall_room);
			const availableLargeRooms = Number.parseInt(a_large_hall_room);

			const updateHotelRoomsQuery = `
            SELECT UPDATE_HOTEL_ROOM(
                ${hotel_id},
                'small_hall',
                ${totalSmallRooms},
                ${availableSmallRooms}
            );

            SELECT UPDATE_HOTEL_ROOM(
                ${hotel_id},
                'medium_hall',
                ${totalMediumRooms},
                ${availableMediumRooms}
            );

            SELECT UPDATE_HOTEL_ROOM(
                ${hotel_id},
                'large_hall',
                ${totalLargeRooms},
                ${availableLargeRooms}
            );
        `;
			await pool.query(updateHotelRoomsQuery);

			return res.status(200).redirect(`/view-rooms/${hotel_id}`);
		} catch (error) {
			return res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	// Client Controllers ->

	eventsPage = async (req, res) => {
		const { userInfo } = req;

		const eventsQuery = `select * from event_reservation where guest_id='${userInfo.id}'`;
		const eventsQueryResult = await pool.query(eventsQuery);
		const events = eventsQueryResult.rows;

		res.status(200).render("dashboard/events.ejs", {
			title: "Events",
			user: userInfo,
			events: events,
			error: "",
		});
	};

	reserveEventPage = async (req, res) => {
		const { userInfo } = req;

		try {
			const eventTypesQuery = "SELECT * FROM event_type";
			const eventTypesResult = await pool.query(eventTypesQuery);
			const eventTypesData = eventTypesResult.rows;

			const hotelsQuery = "SELECT * FROM hotel";
			const hotelsResult = await pool.query(hotelsQuery);
			const hotelsData = hotelsResult.rows;

			const availableRoomsQuery =
				"SELECT * FROM get_available_rooms_with_type()";
			const availableRoomsResult = await pool.query(availableRoomsQuery);
			const availableRoomsData = availableRoomsResult.rows;

			res.status(200).render("dashboard/reserve-event.ejs", {
				title: "Reserve Event",
				user: userInfo,
				eventTypes: eventTypesData,
				hotels: hotelsData,
				rooms: availableRoomsData,
				error: "",
			});
		} catch (error) {
			console.error("Error fetching data for reserve event page:", error);
			res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	reserveEventRegister = async (req, res) => {
		const { userInfo } = req;

		const form = new formidable.IncomingForm();

		try {
			const { fields } = await new Promise((resolve, reject) => {
				form.parse(req, (err, fields) => {
					if (err) {
						reject(err);
					} else {
						resolve({ fields });
					}
				});
			});

			const {
				event_type,
				hotel,
				room,
				start_date,
				end_date,
				room_quantity,
				no_of_people,
			} = fields;

			const userId = Number.parseInt(userInfo.id);
			const hotelId = Number.parseInt(hotel);
			const eventId = Number.parseInt(event_type);
			const roomId = Number.parseInt(room);
			const roomQuantity = Number.parseInt(room_quantity);
			const numberOfPpl = Number.parseInt(no_of_people);

			const insertEventReservationQuery = `
            CALL INSERT_EVENT_RESERVATION(
                ${userId}, ${hotelId}, ${eventId}, ${roomId}, '${start_date}', '${end_date}', ${roomQuantity}, ${0}, CURRENT_DATE, ${numberOfPpl}, ${1}
            )`;

			await pool.query(insertEventReservationQuery);

			return res.status(200).redirect("/events");
		} catch (error) {
			return res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	eventRoomsPage = async (req, res) => {
		const { userInfo } = req;
		const { event_id } = req.params;

		try {
			const eventRoomsQuery = `
            SELECT * FROM GET_EVENT_ROOMS(${event_id})
        `;

			const { rows } = await pool.query(eventRoomsQuery);

			res.status(200).render("dashboard/event-rooms.ejs", {
				title: "Event Rooms",
				user: userInfo,
				eventId: event_id,
				rooms: rows,
			});
		} catch (error) {
			console.error("Error fetching event rooms:", error);
			res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	addRoomsPage = async (req, res) => {
		const { userInfo } = req;
		const { event_id } = req.params;

		try {
			res.status(200).render("dashboard/add-event-rooms.ejs", {
				title: "Add Rooms",
				user: userInfo,
				eventId: event_id,
				error: "",
			});
		} catch (error) {
			console.error("Error fetching event:", error);
			res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};

	addExtraRoom = async (req, res) => {
		const { event_id } = req.params;

		const form = new formidable.IncomingForm();

		try {
			const { fields } = await new Promise((resolve, reject) => {
				form.parse(req, (err, fields) => {
					if (err) {
						reject(err);
					} else {
						resolve({ fields });
					}
				});
			});

			const { extra_room } = fields;

			const extraRoom = Number.parseInt(extra_room);
			const eventId = Number.parseInt(event_id);

			await pool.query(
				`SELECT add_extra_room_to_event_reservation(${eventId}, ${extraRoom})`,
			);

			return res.status(200).redirect(`/event-rooms/${eventId}`);
		} catch (error) {
			console.error("Error fetching event:", error);
			res.status(500).render("dashboard/error.ejs", {
				status: 500,
				title: "Error",
				message: "Internal server error",
				error: error,
			});
		}
	};
}

module.exports = new DashboardController();
