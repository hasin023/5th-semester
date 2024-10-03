-----------------------------------------------------------------------------------------------------------
-- Feature 1: Add a new hotel
CREATE OR REPLACE PROCEDURE CREATE_HOTEL (
    P_HOTEL_NAME VARCHAR,
    P_HOTEL_ADDRESS VARCHAR,
    P_STATE VARCHAR,
    P_ZIPCODE VARCHAR,
    P_WEBSITE VARCHAR,
    P_PHONE VARCHAR
) AS
    $$     BEGIN INSERT INTO HOTEL (
        HOTEL_ID,
        HOTEL_NAME,
        HOTEL_ADDRESS,
        STATE,
        ZIP_CODE,
        WEBSITE,
        PHONE
    ) VALUES (
        NEXTVAL('add_hotel'),
        P_HOTEL_NAME,
        P_HOTEL_ADDRESS,
        P_STATE,
        P_ZIPCODE,
        P_WEBSITE,
        P_PHONE
    );
    RAISE  NOTICE 'Hotel Added Successfully!...';
END;
$$     LANGUAGE PLPGSQL;
 -----------------------------------------------------------------------------------------------------------
 -- Feature 1: Add rooms to the newly added hotel
CREATE OR REPLACE

PROCEDURE CREATE_HOTEL_ROOM (
    P_H_ID INT,
    T_S_ROOM INT,
    T_M_ROOM INT,
    T_L_ROOM INT,
    A_S_ROOM INT,
    A_M_ROOM INT,
    A_L_ROOM INT
) AS
    $$   DECLARE S_ID INT;
    M_ID INT;
    L_ID INT;
BEGIN
    SELECT
        ROOM_ID INTO S_ID
    FROM
        ROOM_TYPE
    WHERE
        ROOM_SIZE = 'small_hall';
    SELECT
        ROOM_ID INTO M_ID
    FROM
        ROOM_TYPE
    WHERE
        ROOM_SIZE = 'medium_hall';
    SELECT
        ROOM_ID INTO L_ID
    FROM
        ROOM_TYPE
    WHERE
        ROOM_SIZE = 'large_hall';
    INSERT INTO AVAILABLE_ROOM_PER_HOTEL (
        AVAILABLE_ROOM_ID,
        HOTEL_ID,
        ROOM_ID,
        TOTAL_ROOM,
        AVAILABLE_ROOM
    ) VALUES (
        NEXTVAL('add_hotel_room'),
        P_H_ID,
        S_ID,
        T_S_ROOM,
        A_S_ROOM
    );
    INSERT INTO AVAILABLE_ROOM_PER_HOTEL (
        AVAILABLE_ROOM_ID,
        HOTEL_ID,
        ROOM_ID,
        TOTAL_ROOM,
        AVAILABLE_ROOM
    ) VALUES (
        NEXTVAL('add_hotel_room'),
        P_H_ID,
        M_ID,
        T_M_ROOM,
        A_M_ROOM
    );
    INSERT INTO AVAILABLE_ROOM_PER_HOTEL (
        AVAILABLE_ROOM_ID,
        HOTEL_ID,
        ROOM_ID,
        TOTAL_ROOM,
        AVAILABLE_ROOM
    ) VALUES (
        NEXTVAL('add_hotel_room'),
        P_H_ID,
        L_ID,
        T_L_ROOM,
        A_L_ROOM
    );
    RAISE NOTICE 'Rooms Added Successfully!...';
END;

$$     LANGUAGE PLPGSQL;
 -- Get rooms by hotel ID
CREATE OR REPLACE

FUNCTION GET_HOTEL_ROOMS(
    P_HOTEL_ID INT
) RETURNS TABLE ( ROOM_ID INT, ROOM_SIZE VARCHAR(30), ROOM_CAPACITY INT, ROOM_PRICE NUMERIC, TOTAL_ROOM INT, AVAILABLE_ROOM INT ) AS
    $$                BEGIN RETURN QUERY
    SELECT
        RT.ROOM_ID,
        RT.ROOM_SIZE,
        RT.ROOM_CAPACITY,
        RT.ROOM_PRICE,
        ARH.TOTAL_ROOM,
        ARH.AVAILABLE_ROOM
    FROM
        AVAILABLE_ROOM_PER_HOTEL ARH
        JOIN ROOM_TYPE RT
        ON ARH.ROOM_ID = RT.ROOM_ID
    WHERE
        ARH.HOTEL_ID = P_HOTEL_ID;
END;
$$                LANGUAGE PLPGSQL;
 -----------------------------------------------------------------------------------------------------------
 -- Feature 2: Update hotel rooms
CREATE            OR REPLACE

FUNCTION UPDATE_HOTEL_ROOM(
    P_HOTEL_ID INT,
    P_ROOM_SIZE VARCHAR,
    P_TOTAL_ROOM INT,
    P_AVAILABLE_ROOM INT
) RETURNS VOID AS
    $$                BEGIN UPDATE AVAILABLE_ROOM_PER_HOTEL AS ARH SET TOTAL_ROOM = P_TOTAL_ROOM, AVAILABLE_ROOM = P_AVAILABLE_ROOM FROM ROOM_TYPE AS RT WHERE ARH.HOTEL_ID = P_HOTEL_ID AND RT.ROOM_ID = ARH.ROOM_ID AND RT.ROOM_SIZE = P_ROOM_SIZE;
END;
$$                LANGUAGE PLPGSQL;
 -----------------------------------------------------------------------------------------------------------
 -- Feature 2 -> Reserve Events by Clients
CREATE            OR REPLACE

PROCEDURE INSERT_EVENT_RESERVATION (
    P_GUEST_ID INT,
    P_HOTEL_ID INT,
    P_EVENT_ID INT,
    P_ROOM_ID INT,
    P_START_DATE DATE,
    P_END_DATE DATE,
    P_ROOM_QUANTITY INT,
    P_ROOM_INVOICE NUMERIC,
    P_DATE_OF_RESERVATION DATE,
    P_NO_OF_PEOPLE NUMERIC,
    P_STATUS INT
) AS
    $$                DECLARE V_TOTAL_ROOMS INT;
    V_AVAILABLE_ROOMS INT;
BEGIN
 -- Insert the event reservation
    INSERT INTO EVENT_RESERVATION (
        GUEST_ID,
        HOTEL_ID,
        EVENT_ID,
        ROOM_ID,
        START_DATE,
        END_DATE,
        ROOM_QUANTITY,
        ROOM_INVOICE,
        DATE_OF_RESERVATION,
        NO_OF_PEOPLE,
        STATUS
    ) VALUES (
        P_GUEST_ID,
        P_HOTEL_ID,
        P_EVENT_ID,
        P_ROOM_ID,
        P_START_DATE,
        P_END_DATE,
        P_ROOM_QUANTITY,
        P_ROOM_INVOICE,
        P_DATE_OF_RESERVATION,
        P_NO_OF_PEOPLE,
        P_STATUS
    );
 -- Update available rooms count for the chosen hotel and room type
    SELECT
        TOTAL_ROOM,
        AVAILABLE_ROOM INTO V_TOTAL_ROOMS,
        V_AVAILABLE_ROOMS
    FROM
        AVAILABLE_ROOM_PER_HOTEL
    WHERE
        HOTEL_ID = P_HOTEL_ID
        AND ROOM_ID = P_ROOM_ID;
    IF V_AVAILABLE_ROOMS >= P_ROOM_QUANTITY THEN
        UPDATE AVAILABLE_ROOM_PER_HOTEL
        SET
            AVAILABLE_ROOM = AVAILABLE_ROOM - P_ROOM_QUANTITY
        WHERE
            HOTEL_ID = P_HOTEL_ID
            AND ROOM_ID = P_ROOM_ID;
    ELSE
 -- Handle insufficient available rooms
        RAISE
    EXCEPTION
        'Insufficient available rooms for reservation';
    END IF;

    RAISE NOTICE 'Event Reservation Added Successfully!...';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Failed to add event reservation. Please contact your administrator!...';
END;
PLPGSQL;
 -----------------------------------------------------------------------------------------------------------
 -- Feature 4: Get event rooms
 -- GET_EVENT_ROOMS function
CREATE OR REPLACE

FUNCTION GET_EVENT_ROOMS(
    P_EVENT_ID INT
) RETURNS TABLE ( HOTEL_ID INT, HOTEL_NAME VARCHAR, ROOM_ID INT, ROOM_SIZE VARCHAR, ROOM_CAPACITY INT, ROOM_PRICE NUMERIC, TOTAL_ROOM INT, AVAILABLE_ROOM INT, START_DATE DATE, END_DATE DATE, ROOM_QUANTITY INT, ROOM_INVOICE NUMERIC, DATE_OF_RESERVATION DATE, NO_OF_PEOPLE NUMERIC, STATUS INT ) AS
    $$               BEGIN RETURN QUERY
    SELECT
        H.HOTEL_ID,
        H.HOTEL_NAME,
        RT.ROOM_ID,
        RT.ROOM_SIZE,
        RT.ROOM_CAPACITY,
        RT.ROOM_PRICE,
        AR.TOTAL_ROOM,
        AR.AVAILABLE_ROOM,
        ER.START_DATE,
        ER.END_DATE,
        ER.ROOM_QUANTITY,
        ER.ROOM_INVOICE,
        ER.DATE_OF_RESERVATION,
        ER.NO_OF_PEOPLE,
        ER.STATUS
    FROM
        EVENT_RESERVATION ER
        JOIN HOTEL H
        ON ER.HOTEL_ID = H.HOTEL_ID
        JOIN ROOM_TYPE RT
        ON ER.ROOM_ID = RT.ROOM_ID
        JOIN AVAILABLE_ROOM_PER_HOTEL AR
        ON H.HOTEL_ID = AR.HOTEL_ID
        AND RT.ROOM_ID = AR.ROOM_ID
    WHERE
        ER.EVENT_ID = P_EVENT_ID;
END;
$$               LANGUAGE PLPGSQL;
 -----------------------------------------------------------------------------------------------------------
 -- Feature 5: Get event rooms by hotel
CREATE           OR REPLACE

FUNCTION GET_AVAILABLE_ROOMS_WITH_TYPE(
) RETURNS TABLE ( AVAILABLE_ROOM_ID INTEGER, HOTEL_ID INTEGER, ROOM_ID INTEGER, ROOM_TYPE_NAME VARCHAR, AVAILABLE_ROOMS INTEGER ) AS
    $$               BEGIN RETURN QUERY
    SELECT
        ARH.AVAILABLE_ROOM_ID,
        ARH.HOTEL_ID,
        ARH.ROOM_ID,
        RT.ROOM_SIZE AS ROOM_TYPE_NAME,
        ARH.AVAILABLE_ROOM
    FROM
        AVAILABLE_ROOM_PER_HOTEL ARH
        INNER JOIN ROOM_TYPE RT
        ON ARH.ROOM_ID = RT.ROOM_ID;
END;
$$               LANGUAGE PLPGSQL;
 -----------------------------------------------------------------------------------------------------------
 -- Feature 6: Adding extra room to event reservation
CREATE           OR REPLACE

FUNCTION ADD_EXTRA_ROOM_TO_EVENT_RESERVATION(
    P_EVENT_RESERVATION_ID INT,
    P_ADDITIONAL_ROOMS INT
) RETURNS VOID AS
    $$               DECLARE V_HOTEL_ID INT;
    V_ROOM_ID        INT;
    V_AVAILABLE_ROOM INT;
    V_ROOM_PRICE     NUMERIC;
BEGIN
    SELECT HOTEL_ID INTO V_HOTEL_ID, ROOM_ID, V_ROOM_ID FROM EVENT_RESERVATION WHERE EVENT_RESERVATION_ID = P_EVENT_RESERVATION_ID;
 -- Check if there are enough available rooms
    SELECT
        AVAILABLE_ROOM INTO V_AVAILABLE_ROOM
    FROM
        AVAILABLE_ROOM_PER_HOTEL
    WHERE
        HOTEL_ID = V_HOTEL_ID
        AND ROOM_ID = V_ROOM_ID;
    IF V_AVAILABLE_ROOM < P_ADDITIONAL_ROOMS THEN
        RAISE
    EXCEPTION
        'Not enough available rooms for the requested addition';
    END IF;
 -- Retrieve the room price
    SELECT
        ROOM_PRICE INTO V_ROOM_PRICE
    FROM
        ROOM_TYPE
    WHERE
        ROOM_ID = V_ROOM_ID;
 -- Update the EVENT_RESERVATION table
    UPDATE EVENT_RESERVATION
    SET
        ROOM_QUANTITY = ROOM_QUANTITY + P_ADDITIONAL_ROOMS,
        ROOM_INVOICE = ROOM_INVOICE + (
            P_ADDITIONAL_ROOMS * V_ROOM_PRICE
        )
    WHERE
        EVENT_RESERVATION_ID = P_EVENT_RESERVATION_ID
        AND STATUS = 1;
 -- Ensure the status is 'Reserved'
 -- Update the AVAILABLE_ROOM_PER_HOTEL table
    UPDATE AVAILABLE_ROOM_PER_HOTEL
    SET
        AVAILABLE_ROOM = AVAILABLE_ROOM - P_ADDITIONAL_ROOMS
    WHERE
        HOTEL_ID = V_HOTEL_ID
        AND ROOM_ID = V_ROOM_ID;
    RAISE NOTICE 'Extra room added successfully!...';
    $$ LANGUAGE PLPGSQL;