// Set up MySQL connection.
let mysql = require("mysql");
require('dotenv').config()
// const db = require('db')


let connection = mysql.createConnection({
  host: process.env.DB_host,
  port: process.PORT || 3013,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_database
})

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;