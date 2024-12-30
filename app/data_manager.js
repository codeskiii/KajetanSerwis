/* 
This module contains functions that are used to manage DB
*/

/*

========== ORDER MANAGING FUNCTIONS =================================

1. INSERT ORDER WITH WRITEN QUERY

2. DELETE ORDER WITH WRITEN QUERY

3. UPDATE ORDER WITH WRITEN QUERY
*/

function insertOrder(order, con) {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format current date
  const order_data = order.data;

  const query = `INSERT INTO orders (UserId, CreationDate, StartDay, EndDay, IsActive, CreatedBy, Note) VALUES (${order_data.userId}, '${currentDate}', '${order_data.dateStart}', '${order_data.dateEnd}', ${order_data.isActive}, '${order_data.createdBy}', '${order_data.note}');`;

  con.query(query, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
  });
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

/*

========== USER MANAGING FUNCTIONS =================================

1. INSERT USER WUTH WRITEN QUERY

2. DELETE USER WITH WRITEN QUERY

3. UPDATE USER WITH WRITEN QUERY

*/

function insertUser(user_data, con) {
    const user = user_data.data;
    console.log("Inserted user: " + user)
    const query = `INSERT INTO users (Name, SecondName, Surname, Email, PhoneNumber) VALUES ('${user.name}', '${user.secondName}', '${user.surname}', '${user.email}', '${user.phoneNumber}');`;

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 user inserted");
    });
}

function deleteUser(userId, con) {
    const query = `DELETE FROM users WHERE UserId = ${userId};`;

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Number of users deleted: " + result.affectedRows);
    });
}

function updateUser(user, con) {
    const query = `UPDATE users SET Name = '${user.name}', SecondName = '${user.secondName}', Surname = '${user.surname}', Email = '${user.email}', PhoneNumber = '${user.phoneNumber}' WHERE UserId = ${user.userId};`;

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Number of users updated: " + result.affectedRows);
    });
}

module.exports = {
// USER FUNCTIONS
  insertUser,
  deleteUser,
  updateUser,

// ORDER FUNCTIONS
  insertOrder,
  deleteOrder,
  updateOrder
};