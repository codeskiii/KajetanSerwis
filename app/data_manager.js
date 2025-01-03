/* 
This module contains functions that are used to manage DB
*/

/*

========== ORDER MANAGING FUNCTIONS =================================

1. INSERT ORDER WITH WRITTEN QUERY

2. DELETE ORDER WITH WRITTEN QUERY

3. UPDATE ORDER WITH WRITTEN QUERY
*/

function insertOrder(order, con) {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format current date
    const { userId, dateStart, dateEnd, isActive, createdBy, note } = order.data;

    const query = `INSERT INTO orders (UserId, CreationDate, StartDay, EndDay, IsActive, CreatedBy, Note) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    con.query(query, [userId, currentDate, dateStart, dateEnd, isActive, createdBy, note], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

function deleteOrder(serviceId, con) {
    const query = `DELETE FROM orders WHERE ServiceId = ?`;

    con.query(query, [serviceId], function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
}

function updateOrder(order, con) {
    const { dateStart, dateEnd, isActive, note, ServiceId } = order.data;
    console.log(dateStart, dateEnd, isActive, note, ServiceId);

    const query = `UPDATE orders SET StartDay = ?, EndDay = ?, IsActive = ?, Note = ? WHERE ServiceId = ?`;

    con.query(query, [dateStart, dateEnd, isActive, note, ServiceId], function (err, result) {
        if (err) throw err;
        console.log("Number of records updated: " + result.affectedRows);
    });
}

/*

========== USER MANAGING FUNCTIONS =================================

1. INSERT USER WITH WRITTEN QUERY

2. DELETE USER WITH WRITTEN QUERY

3. UPDATE USER WITH WRITTEN QUERY

*/

function insertUser(user_data, con) {
    const { name, secondName, surname, email, phoneNumber } = user_data.data;

    const query = `INSERT INTO users (Name, SecondName, Surname, Email, PhoneNumber) VALUES (?, ?, ?, ?, ?)`;

    con.query(query, [name, secondName, surname, email, phoneNumber], function (err, result) {
        if (err) throw err;
        console.log("1 user inserted");
    });
}

function deleteUser(userId, con) {
    const query = `DELETE FROM users WHERE UserId = ?`;

    con.query(query, [userId], function (err, result) {
        if (err) throw err;
        console.log("Number of users deleted: " + result.affectedRows);
    });
}

function updateUser(user, con) {
    const { name, secondName, surname, email, phoneNumber, userId } = user;

    const query = `UPDATE users SET Name = ?, SecondName = ?, Surname = ?, Email = ?, PhoneNumber = ? WHERE UserId = ?`;

    con.query(query, [name, secondName, surname, email, phoneNumber, userId], function (err, result) {
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
    updateOrder,
};
