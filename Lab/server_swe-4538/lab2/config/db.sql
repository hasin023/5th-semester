CREATE DATABASE ANIMEE;

DROP TABLE IF EXISTS USERS CASCADE;

CREATE TABLE USERS (
    USER_ID SERIAL PRIMARY KEY,
    EMAIL VARCHAR(50) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    IMG_URL TEXT,
    USER_TYPE VARCHAR(50) NOT NULL,
    FIRST_TIME BOOLEAN DEFAULT TRUE,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO USERS (
    EMAIL,
    PASSWORD,
    IMG_URL,
    USER_TYPE
) VALUES (
    'hasin@yaoo.com',
    '11111111',
    '/pfp.png',
    'user'
);

/* Dropping the tables */

DROP TABLE IF EXISTS ANIME CASCADE;

DROP TABLE IF EXISTS TAG CASCADE;

DROP TABLE IF EXISTS REVIEW CASCADE;

DROP TABLE IF EXISTS WATCHLIST CASCADE;

--------------------------------------------------------------------------------------------------------------------------------------------

/* Creating and inserting values in the tables */

CREATE TABLE ANIME (
    ANIME_ID SERIAL PRIMARY KEY,
    ANIME_NAME VARCHAR(50) NOT NULL,
    DESCRIPTION TEXT,
    ANIME_IMG TEXT,
    POPULARITY FLOAT DEFAULT 0,
);

INSERT INTO ANIME (
    ANIME_NAME
) VALUES (
    'Naruto'
),
(
    'Attack on Titan'
),
(
    'Boku no Hero Academia'
),
(
    'Demon Slayer'
),
(
    'One Punch Man'
);

CREATE TABLE TAG (
    TAG_ID SERIAL PRIMARY KEY,
    TAG_NAME VARCHAR(50) NOT NULL
);

INSERT INTO TAG (
    TAG_NAME
) VALUES (
    'Action'
),
(
    'Adventure'
),
(
    'Fantasy'
),
(
    'Isekai'
),
(
    'Shounen'
),
(
    'Supernatural'
);

CREATE TABLE ANIMETAGS (
    ANIME_ID INT REFERENCES ANIME(ANIME_ID) ON DELETE CASCADE,
    TAG_ID INT REFERENCES TAG(TAG_ID) ON DELETE CASCADE,
    PRIMARY KEY (ANIME_ID, TAG_ID)
);

INSERT INTO ANIMETAGS (
    ANIME_ID,
    TAG_ID
) VALUES (
    5,
    2
),
(
    5,
    3
),
(
    5,
    5
),
(
    5,
    6
);

--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE REVIEW (
    REVIEW_ID SERIAL PRIMARY KEY,
    ANIME_ID INT REFERENCES ANIME(ANIME_ID) ON DELETE CASCADE,
    USER_ID INT REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    RATING INT CHECK (RATING BETWEEN 1 AND 10),
    REVIEW_TEXT TEXT,
    REVIEW_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE WATCHLIST (
    WATCHLIST_ID SERIAL PRIMARY KEY,
    USER_ID INT REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    ANIME_ID INT REFERENCES ANIME(ANIME_ID) ON DELETE CASCADE,
    STATUS VARCHAR(50) CHECK (STATUS IN ('watching', 'watched', 'watch-later')),
    ADDED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);