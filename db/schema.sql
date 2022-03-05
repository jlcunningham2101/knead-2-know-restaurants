DROP TABLE IF EXISTS restaurant;
DROP TABLE IF EXISTS user_type;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS menu_comments;

CREATE TABLE restaurant (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  restaurant_name VARCHAR(30) NOT NULL,
  food_type VARCHAR(30) NOT NULL,
  business_address VARCHAR(255), 
  city VARCHAR(255),
  phone_number INTEGER,
  website VARCHAR (50),
  food_description TEXT
  );

CREATE TABLE user_type (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  user_role INTEGER NOT NULL,
  username VARCHAR(30) NOT NULL,
  user_password VARCHAR(255), 
  email 
  );

CREATE TABLE user (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  user_type_id ('admin', 'customer', 'restaurant_owner')
  );

CREATE TABLE menu (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 business_id INTEGER NOT NULL,
description TEXT,
price INTEGER NOT NULL,
);

CREATE TABLE menu_comments (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
business_id INTEGER NOT NULL,
user_id INTEGER NOT NULL,
menu_rating INTEGER NOT NULL,
description TEXT,
);