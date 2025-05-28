#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();