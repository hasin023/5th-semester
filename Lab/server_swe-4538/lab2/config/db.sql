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
    'Naruto',
    'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
    'anime.jpg'
),
(
    'Attack on Titan',
    'Attack on Titan is a Japanese manga series written and illustrated by Hajime Isayama. It is set in a world where humanity lives within cities surrounded by enormous walls that protect them from gigantic',
    'anime.jpg'
),
(
    'Boku no Hero Academia',
    'My Hero Academia is a Japanese superhero manga series written and illustrated by Kōhei Horikoshi. It has been serialized in Weekly Shōnen Jump since July 2014, with its chapters additionally collected in 24 tankōbon volumes as of August 2019.',
    'anime.jpg'
),
(
    'Demon Slayer',
    'Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and illustrated by Koyoharu Gotouge. It follows Tanjiro Kamado, a young boy who becomes a demon slayer after his family is killed by demons.',
    'anime.jpg'
),
(
    'One Punch Man',
    'One punch man is the story of Saitama, a hero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge due to his overwhelming strength.',
    'anime.jpg'
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

CREATE TABLE USERTAGS (
    USER_ID INT REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    TAG_ID INT REFERENCES TAG(TAG_ID) ON DELETE CASCADE,
    PRIMARY KEY (USER_ID, TAG_ID)
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

-- Insert data into the REVIEW table:
INSERT INTO REVIEW (
    ANIME_ID,
    USER_ID,
    RATING,
    REVIEW_TEXT
) VALUES (
    1,
    1,
    9,
    'Naruto is an amazing anime with a deep storyline and well-developed characters. Highly recommended!'
),
(
    2,
    1,
    10,
    'Attack on Titan is a masterpiece! The plot twists and the action scenes are simply incredible.'
),
(
    3,
    1,
    8,
    'Boku no Hero Academia is a great anime for superhero fans. It has a lot of emotional moments and exciting battles.'
),
(
    4,
    1,
    9,
    'Demon Slayer is visually stunning with a gripping plot. Tanjiro’s journey is really heartwarming.'
),
(
    5,
    1,
    7,
    'One Punch Man is fun and entertaining, though it lacks the emotional depth of some other series. Still, a great watch for action fans.'
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE WATCHLIST (
    WATCHLIST_ID SERIAL PRIMARY KEY,
    USER_ID INT REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    ANIME_ID INT REFERENCES ANIME(ANIME_ID) ON DELETE CASCADE,
    STATUS VARCHAR(50) CHECK (STATUS IN ('watching', 'watched', 'watch-later')),
    ADDED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO WATCHLIST (
    USER_ID,
    ANIME_ID,
    STATUS
) VALUES (
    1,
    1,
    'watching' -- User 1 watching Naruto
),
(
    1,
    2,
    'watched' -- User 1 watched Attack on Titan
),
(
    1,
    3,
    'watch-later' -- User 1 plans to watch Boku no Hero Academia later
),
(
    1,
    4,
    'watching' -- User 1 is watching Demon Slayer
),
(
    1,
    5,
    'watched' -- User 1 watched One Punch Man
);