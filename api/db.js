const mysql = require("mysql")

const db = mysql.createConnection({
    host : 'localhost',
    user : "root",
    password : '', 
    database : 'inotebook'
});

db.connect();

module.exports = db

