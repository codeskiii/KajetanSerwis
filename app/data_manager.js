function insertOrder(order, con) {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format current date
  const order_data = order.data;

  // Handle undefined values by using NULL or appropriate default
  const createdBy = order_data.creationBy !== undefined ? `'${order_data.creationBy}'` : 'NULL';
  const note = order_data.note !== undefined ? `'${order_data.note}'` : 'NULL';

  const query = `INSERT INTO orders (UserId, CreationDate, StartDay, EndDay, IsActive, CreatedBy, Note)
VALUES (${order_data.userId}, '${currentDate}', '${order_data.dateStart}', '${order_data.dateEnd}',
${order_data.isActive}, ${createdBy}, ${note});`;

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

module.exports = {
  insertOrder,
  deleteOrder,
  updateOrder
};