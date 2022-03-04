DROP TABLE IF EXISTS restaurant;

CREATE TABLE restaurant (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  restaurant_name VARCHAR(30) NOT NULL,
  food_type VARCHAR(30) NOT NULL,
  business_address VARCHAR(255), 
  city VARCHAR(255),
  phone_number INTEGER,
  website VARCHAR (50),
  description TEXT
  );