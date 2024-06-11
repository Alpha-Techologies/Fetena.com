require("dotenv").config({
  path: "./../.env"
});
const DB_DATABASE = process.env.DATABASE;


module.exports = {
  dbAuth: {
    database: DB_DATABASE,
  },
};