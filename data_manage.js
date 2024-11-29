var mysql = require('mysql2');

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