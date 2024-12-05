function insertOrder(order, con) {
  const query = `INSERT INTO users (Name, SecondName, Surname, Email, PhoneNumber)
VALUES ('Jan', 'Kowalski', 'Nowak', 'jan.kowalski@example.com', '1234567890');`;

  //con.query(query, function (err, result) {
  //    if (err) throw err;
  //    console.log("1 record inserted");
  //  });
}

function deleteOrder(order, con) {
  const query = `DELETE FROM odrders WHERE x = ;`;

  con.query(query, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
}

function updateOrder(order, con) {
  const query = "UPDATE orders SET x = y_1 WHERE x = y_2";
  
  con.query(query, function (err, result) {
      if (err) throw err;
      console.log("Number of records updated: " + result.affectedRows);
    });
}

module.exports = {
  insertOrder,
  deleteOrder,
  updateOrder
};