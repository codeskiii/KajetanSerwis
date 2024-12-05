CREATE TABLE IF NOT EXISTS additional_expenses (
    AdditionalExpensesId INTEGER NOT NULL,
    equipmentId INT PRIMARY KEY PRIMARY KEY,
    FOREIGN KEY (AdditionalExpensesId) REFERENCES money_stuff(AdditionalExpensesId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS equipment (
  equipmentId INTEGER PRIMARY KEY,
  equipmentName VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  cost FLOAT NOT NULL,
  margin FLOAT NOT NULL,
  FOREIGN KEY (equipmentId) REFERENCES additional_expenses(equipmentId) ON DELETE CASCADE
);