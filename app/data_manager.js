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
        console.log("1 record inserted into orders");
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
    const { dateStart, dateEnd, isActive, note, ServiceId, ServiceCost, Tax } = order.data;
    console.log(dateStart, dateEnd, isActive, note, ServiceId, ServiceCost, Tax);

    // Build dynamic query for `orders` table
    let updateFields = [];
    let updateValues = [];

    if (dateStart) {
        updateFields.push("StartDay = ?");
        updateValues.push(dateStart);
    }
    if (dateEnd) {
        updateFields.push("EndDay = ?");
        updateValues.push(dateEnd);
    }
    if (isActive !== undefined) { // Allow `false` values
        updateFields.push("IsActive = ?");
        updateValues.push(isActive);
    }
    if (note) {
        updateFields.push("Note = ?");
        updateValues.push(note);
    }

    if (updateFields.length > 0) {
        const query = `UPDATE orders SET ${updateFields.join(", ")} WHERE ServiceId = ?`;
        updateValues.push(ServiceId);

        con.query(query, updateValues, function (err, result) {
            if (err) throw err;
            console.log("Number of records updated: " + result.affectedRows);
        });
    } else {
        console.log("No fields to update in orders table.");
    }

    // Insert into `money_stuff` table if values are provided
    if (ServiceCost || Tax) {
        const query_2 = `INSERT INTO money_stuff (ServiceId, ServiceCost, Tax) VALUES (?, ?, ?)`;
        con.query(query_2, [ServiceId, ServiceCost || null, Tax || null], function (err, resul) {
            if (err) throw err;
            console.log("1 record inserted into money table");
        });
    } else {
        console.log("No values provided for money_stuff table.");
    }
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
