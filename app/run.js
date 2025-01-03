const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const data_manager = require('./data_manager.js');
const PORT = 3030;

console.log("Initializing...");

// Creating connection to orders database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Piotr123.,',
    database: 'serwis'
});

con.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        process.exit(1); // Wyjœcie z aplikacji w przypadku b³êdu po³¹czenia
    }
    console.log("Connected to database!");
});

// Initializing web app
const app = express();
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());

/*
PAGES
*/

app.get('/', (req, res) => {
    const query = "SELECT * FROM orders;";
    con.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            res.status(500).send("Error fetching orders");
            return;
        }
        console.log("Loaded orders:", result);
        res.render('index', { data: result });
    });
});

app.get('/clients', (req, res) => {
    const query = "SELECT * FROM users;";
    con.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).send("Error fetching users");
            return;
        }
        console.log("Loaded clients:", result);
        res.render('clients', { data: result });
    });
});

/*
POSTING STUFF
*/

app.post('/send-order', (req, res) => {
    const order = req.body;
    if (!order || !order.data) {
        res.status(400).send("Invalid order data");
        return;
    }
    data_manager.insertOrder(order, con);
    console.log("Inserted order:", order);
    res.send("Received order from client");
});

app.post('/send-user', (req, res) => {
    const user = req.body;
    if (!user || !user.data) {
        res.status(400).send("Invalid user data");
        return;
    }
    data_manager.insertUser(user, con);
    console.log("Inserted user:", user);
    res.send("Received user from client");
});

/*
DELETING STUFF
*/

app.delete('/delete-order/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Order ID is required");
        return;
    }
    console.log(`Deleting order with ID: ${id}`);
    data_manager.deleteOrder(id, con);
    res.send(`Order with ID ${id} deleted`);
});

app.delete('/delete-user/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("User ID is required");
        return;
    }
    console.log(`Deleting user with ID: ${id}`);
    data_manager.deleteUser(id, con);
    res.send(`User with ID ${id} deleted`);
});

/*
UPDATING STUFF
*/

app.post('/update-order', (req, res) => { // Poprawiono na PUT
    const order = req.body;
    if (!order || !order.data) {
        res.status(400).send("Invalid order data");
        return;
    }
    console.log(`Updating order:`, order);
    data_manager.updateOrder(order, con);
    res.send("Order updated");
});

/*
LISTEN (it's true art)
*/

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
