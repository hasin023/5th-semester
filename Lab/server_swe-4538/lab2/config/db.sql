CREATE DATABASE EVENTMS;

CREATE TABLE USERS (
    USER_ID SERIAL PRIMARY KEY,
    EMAIL VARCHAR(50) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    IMG_URL TEXT,
    USER_TYPE VARCHAR(50) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Dropping the tables */

DROP TABLE IF EXISTS EVENT_RESERVATION CASCADE;

DROP TABLE IF EXISTS GUEST CASCADE;

DROP TABLE IF EXISTS EVENT_TYPE CASCADE;

DROP TABLE IF EXISTS AVAILABLE_ROOM_PER_HOTEL CASCADE;

DROP TABLE IF EXISTS ROOM_TYPE CASCADE;

DROP TABLE IF EXISTS HOTEL CASCADE;

--------------------------------------------------------------------------------------------------------------------------------------------

/* Creating and inserting values in the tables */

CREATE TABLE HOTEL (
    HOTEL_ID SERIAL PRIMARY KEY,
    HOTEL_NAME VARCHAR(50) NOT NULL,
    HOTEL_ADDRESS VARCHAR(100),
    STATE VARCHAR(50) NOT NULL,
    ZIP_CODE VARCHAR(30),
    WEBSITE VARCHAR(255),
    PHONE VARCHAR(30)
);

INSERT INTO HOTEL (
    HOTEL_NAME,
    HOTEL_ADDRESS,
    STATE,
    ZIP_CODE,
    WEBSITE,
    PHONE
) VALUES (
    'Hotel ABC',
    '1234, ABC Street, XYZ City',
    'Maryland',
    '21201',
    'www.hotelabc.com',
    '+1 123-456 (7890)'
),
(
    'Hotel XYZ',
    '5678, XYZ Street, ABC City',
    'Maryland',
    '21202',
    'www.hotelxyz.com',
    '+1 098-765 (4321)'
),
(
    'Hotel PQR',
    '9876, PQR Street, XYZ City',
    'Maryland',
    '21203',
    'www.hotelpqr.com',
    '+1 234-567 (8901)'
);

--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE ROOM_TYPE (
    ROOM_ID SERIAL PRIMARY KEY,
    ROOM_SIZE VARCHAR(30) CHECK (ROOM_SIZE IN ('small_hall', 'medium_hall', 'large_hall')),
    ROOM_CAPACITY INTEGER,
    ROOM_PRICE NUMERIC,
    CONSTRAINT ROOM_CAPACITY_POSITIVE_CK CHECK (ROOM_CAPACITY > 0),
    CONSTRAINT ROOM_PRICE_POSITIVE_CK CHECK (ROOM_PRICE > 0)
);

INSERT INTO ROOM_TYPE (
    ROOM_SIZE,
    ROOM_CAPACITY,
    ROOM_PRICE
) VALUES (
    'small_hall',
    100,
    500
),
(
    'medium_hall',
    250,
    1000
),
(
    'large_hall',
    500,
    2000
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE AVAILABLE_ROOM_PER_HOTEL (
    AVAILABLE_ROOM_ID SERIAL PRIMARY KEY,
    HOTEL_ID INT NOT NULL,
    ROOM_ID INT NOT NULL,
    TOTAL_ROOM INT,
    AVAILABLE_ROOM INT,
    FOREIGN KEY (HOTEL_ID) REFERENCES HOTEL (HOTEL_ID),
    FOREIGN KEY (ROOM_ID) REFERENCES ROOM_TYPE (ROOM_ID)
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE EVENT_TYPE (
    EVENT_ID SERIAL PRIMARY KEY,
    EVENT_NAME VARCHAR(50) NOT NULL
);

INSERT INTO EVENT_TYPE (
    EVENT_NAME
) VALUES (
    'Birthday'
),
(
    'Wedding'
),
(
    'Conference'
),
(
    'Workshop'
),
(
    'University Admission'
),
(
    'Hackathon'
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE SERVICE_TYPE (
    SERVICE_ID SERIAL PRIMARY KEY,
    SERVICE_NAME VARCHAR(30) NOT NULL,
    SERVICE_APPLIES VARCHAR(30),
    SERVICE_AMOUNT NUMERIC
);

INSERT INTO SERVICE_TYPE (
    SERVICE_NAME,
    SERVICE_APPLIES,
    SERVICE_AMOUNT
) VALUES (
    'Breakfast',
    'per_person',
    10
),
(
    'Lunch',
    'per_person',
    20
),
(
    'DJ',
    'per_event',
    500
),
(
    'Singer',
    'per_event',
    2000
),
(
    'Pop band',
    'per_event',
    10000
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE EVENT_RESERVATION (
    EVENT_RESERVATION_ID SERIAL PRIMARY KEY,
    GUEST_ID INT NOT NULL,
    HOTEL_ID INT NOT NULL,
    EVENT_ID INT NOT NULL,
    START_DATE DATE,
    END_DATE DATE,
    ROOM_ID INT NOT NULL,
    ROOM_QUANTITY INT NOT NULL,
    ROOM_INVOICE NUMERIC,
    DATE_OF_RESERVATION DATE,
    NO_OF_PEOPLE NUMERIC,
    STATUS INT,
    CONSTRAINT STATUS_CK CHECK (STATUS IN (1, 2, 3)), -- 1=Reserved, 2=Cancelled, 3=Finished
    FOREIGN KEY (GUEST_ID) REFERENCES USERS (USER_ID),
    FOREIGN KEY (HOTEL_ID) REFERENCES HOTEL (HOTEL_ID),
    FOREIGN KEY (EVENT_ID) REFERENCES EVENT_TYPE (EVENT_ID),
    FOREIGN KEY (ROOM_ID) REFERENCES ROOM_TYPE (ROOM_ID)
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE SERVICE_RESERVATION (
    SERVICE_RESERVATION_ID SERIAL PRIMARY KEY,
    EVENT_RESERVATION_ID INT NOT NULL,
    SERVICE_ID INT NOT NULL,
    SERVICE_DATE DATE,
    FOREIGN KEY (EVENT_RESERVATION_ID) REFERENCES EVENT_RESERVATION (EVENT_RESERVATION_ID),
    FOREIGN KEY (SERVICE_ID) REFERENCES SERVICE_TYPE (SERVICE_ID)
);

--------------------------------------------------------------------------------------------------------------------------------------------