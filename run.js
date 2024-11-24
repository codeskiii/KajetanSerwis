var express = require('express');
var path = require('path');
var mysql = require('mysql2');

const PORT = 3030;

// Creating connection to orders database

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

// Initializing web application 

var app = express();
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});