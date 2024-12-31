const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const data_manager = require('./data_manager.js');
const PORT = 3030;

console.log("Initializing...");

// Creating connection to orders database

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Piotr123.,',
    database: 'serwis'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

// Initializing web app 

var app = express();
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

// create application/json parser
app.use(express.json());

/*
PAGES
*/

app.get('/', (req, res) => {
    var query = "SELECT * FROM orders;";

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Loaded order");
        console.log(result);

        res.render('index', {
            data: result 
        });
      });
    console.log('Home loaded successfully!')
});

app.get('/clients', (req, res) => {
    var query = "SELECT * FROM users;";

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Loaded clients");
        console.log(result);

        res.render('clients', {
            data: result 
        });
    });
});

/*
POSTING STUFF
*/

app.post('/send-order', (req, res) => {
    const order = req.body;
    //console.log(`UserID: ${order}`);
    res.send('Recived order from client')
    console.log(order);
    data_manager.insertOrder(order, con);
    console.log('Inserted order')
}); 

app.post('/send-user', (req, res) => {
    const user = req.body;
    res.send('Received user from client');
    data_manager.insertUser(user, con);
});

/*
DELETEING STUFF
*/


/*
LISTEN (it's true art)
*/

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});