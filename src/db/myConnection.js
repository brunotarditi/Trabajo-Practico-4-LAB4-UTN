const mysql = require("mysql");

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lab4_tp4",
  port: 3306,
  connectionLimit: 100,
});

module.exports = conn;

