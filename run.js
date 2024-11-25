var express = require('express');
var path = require('path');
var mysql = require('mysql2');

const PORT = 3030;

// Creating connection to orders database

var con = mysql.createConnection({
    host: '',
    user: '',
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

// create application/json parser
app.use(express.json());


app.get('/', (req, res) => {
    res.render('index');
});

function insertOrder(order) {
    const query = `INSERT INTO odrders (ClientId, OdrderId, Start, End, Expenses, Margin, PriceTotal) VALUES (${order.ClientId}, '${order.OrderId}', '${order.dateStart}', '${order.dateEnd}', ${JSON.stringify(order.Expenses)}, ${order.Margin}, ${order.PriceTotal});`;

    con.execute(query, (error, results) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Insert successful:', results);
    }
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