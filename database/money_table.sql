CREATE TABLE IF NOT EXISTS money_stuff (
    ServiceId INTEGER,
    AdditionalExpensesId INTEGER PRIMARY KEY AUTO_INCREMENT,
    ServiceCost FLOAT,
    Tax FLOAT,
    FOREIGN KEY (ServiceId) REFERENCES orders(ServiceId) ON DELETE CASCADE
);