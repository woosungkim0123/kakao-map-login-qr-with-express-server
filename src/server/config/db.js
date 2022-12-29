"use strict";

import mysql from "mysql2";

export const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PSWORD,
  charset: process.env.DB_CHARSET,
};

const db = mysql.createPool(config).promise();

export default db;
