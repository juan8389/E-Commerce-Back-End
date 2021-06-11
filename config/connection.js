// Set up MySQL connection.
var mysql = require("mysql");

let connection;
if(process.env.JAWSDB_URL && process.env.JAWSDB_URL.length > 0){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "ecommerce_db"
  });
}
// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

connection.on('enqueue', function(query) { console.log(query.sql) });

// Export connection for our ORM to use.
module.exports = connection;
