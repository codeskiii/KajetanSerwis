var express = require('express');
var path = require('path');
var mysql = require('mysql2');

const PORT = 3030;

// Creating connection to orders database

var con = mysql.createConnection({
    host: '.',
    user: '.',
    password: '.',
    database: '.'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

// Initializing web application 

var app = express();
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

// create application/json parser
app.use(express.json());


app.get('/', (req, res) => {
    res.render('index');
});

function insertOrder(order) {
    const query = `INSERT INTO odrders () VALUES ();`;

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
}

function deleteOrder(order) {
    const query = `DELETE FROM odrders WHERE x = ;`;

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
      });
}

function updateOrder(order) {
    const query = "UPDATE orders SET x = y_1 WHERE x = y_2";
    
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Number of records updated: " + result.affectedRows);
      });
}

app.post('/send', (req, res) => {
    const order = req.body;
    //console.log(`UserID: ${order}`);
    res.send('Recived order from client')
    insertOrder(order);
    console.log('Inserted order')
}); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});