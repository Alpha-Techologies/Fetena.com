// const dotenv = require("dotenv").config();
require("dotenv").config({
  path: "./../.env"
});

// const DB_HOST = process.env.DB_HOST;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD*Root@13579
const DB_DATABASE = process.env.DATABASE;


module.exports = {
  dbAuth: {
    // host: DB_HOST,
    // user: DB_USER,
    // password: "",
    database: DB_DATABASE,
  },
};