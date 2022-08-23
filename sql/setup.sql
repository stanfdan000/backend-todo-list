-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE user (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fisrt_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    passowrd_hash VARCHAR NOT NULL
);