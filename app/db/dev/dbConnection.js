import pool from './pool';

pool.on('connect', () => {
    console.log('connected to the db');
});

const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  username VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  contact VARCHAR UNIQUE NOT NULL,
  role VARCHAR(100) NOT NULL, 
  password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_on DATE NOT NULL)`;

    pool.query(userCreateQuery)
        .then((res) => {
            console.log("User Table created");
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Create Shops Table
 */
const createShopTable = () => {
    const shopCreateQuery = `CREATE TABLE IF NOT EXISTS shops
    (id SERIAL PRIMARY KEY,
    shop_name VARCHAR(100) NOT NULL,
    shop_address VARCHAR(100) NOT NULL,
    shop_owner INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_bikes VARCHAR(100) NOT NULL,
    available_bikes VARCHAR(100) NOT NULL,
    price VARCHAR(100),
    created_on DATE NOT NULL)`;

    pool.query(shopCreateQuery)
        .then((res) => {
            console.log("Shop Table created");
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Create Booking Table
 */
const createBookingTable = () => {
    const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS booking(id SERIAL, 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    booking_from DATE,
    booking_to DATE, 
    no_of_bikes INTEGER NOT NULL,     
    created_on DATE NOT NULL,
    PRIMARY KEY (id))`;
    pool.query(bookingCreateQuery)
        .then((res) => {
            console.log("Booking Table created");
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const createRatingsTable = () => {
    const ratingCreateQuery = `CREATE TABLE IF NOT EXISTS rating(id SERIAL, 
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    review_message VARCHAR(100),
    review_stars INTEGER,    
    created_on DATE NOT NULL,
    PRIMARY KEY (id))`;
    pool.query(ratingCreateQuery)
        .then((res) => {
            console.log("Rating Table created");
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const createEventsTable = () => {
    const eventCreateQuery = `CREATE TABLE IF NOT EXISTS events(id SERIAL, 
    created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    event_date DATE NOT NULL,
    total_peoples INTEGER,
    difficulty BOOLEAN,
    starting_point VARCHAR(100) NOT NULL,
    ending_point VARCHAR(100) NOT NULL,
    distance INTEGER, 
    created_on DATE NOT NULL,
    PRIMARY KEY (id))`;
    pool.query(eventCreateQuery)
        .then((res) => {
            console.log("event Table created");
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const createDestinationsTable = () => {
    const destinationsCreateQuery = `CREATE TABLE IF NOT EXISTS destinations(id SERIAL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    is_difficult BOOLEAN,
    starting_point VARCHAR(100) NOT NULL,
    ending_point VARCHAR(100) NOT NULL,
    distance INTEGER, 
    created_on DATE NOT NULL,
    PRIMARY KEY (id))`;
    pool.query(destinationsCreateQuery)
        .then((res) => {
            console.log("dest Table created");
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const createStoriesTable = () => {
    const storiesCreateQuery = `CREATE TABLE IF NOT EXISTS stories(id SERIAL, 
    created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    story TEXT,
    difficulty BOOLEAN,
    starting_point VARCHAR(100) NOT NULL,
    ending_point VARCHAR(100) NOT NULL,
    distance INTEGER, 
    created_on DATE NOT NULL,
    active BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id))`;
    pool.query(storiesCreateQuery)
        .then((res) => {
            console.log("stories Table created");
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
/**
 * Drop User Table
 */
const dropUserTable = () => {
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(usersDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Drop Bus Table
 */
const dropShopTable = () => {
    const shopDropQuery = 'DROP TABLE IF EXISTS shops';
    pool.query(shopDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Booking Table
 */
const dropBookingTable = () => {
    const bookingDropQuery = 'DROP TABLE IF EXISTS booking';
    pool.query(bookingDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const dropRatingsTable = () => {
    const ratingDropQuery = 'DROP TABLE IF EXISTS rating';
    pool.query(ratingDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const dropEventsTable = () => {
    const eventsDropQuery = 'DROP TABLE IF EXISTS events';
    pool.query(eventsDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const dropDestinationsTable = () => {
    const destinationsDropQuery = 'DROP TABLE IF EXISTS destinations';
    pool.query(destinationsDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
const dropStoriesTable = () => {
    const storiesDropQuery = 'DROP TABLE IF EXISTS stories';
    pool.query(storiesDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Create All Tables
 */
const createAllTables = async () => {
    createUserTable();
    createShopTable();
    createBookingTable();
    createRatingsTable();
    createEventsTable();
    createDestinationsTable();
    createStoriesTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUserTable();
    dropShopTable();
    dropBookingTable();
    dropRatingsTable();
    dropEventsTable();
    dropDestinationsTable();
    dropStoriesTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

// module.exports.create = function (){
//     createAllTables();
// }
// module.exports.drop = function (){
//     dropAllTables();
// }
export {
    createAllTables,
    dropAllTables,
};

require('make-runnable');