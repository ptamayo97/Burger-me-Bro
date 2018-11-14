

-- If databse already exists replace it: 
DROP DATABASE IF EXISTS burger_db;

/* Create database: */
CREATE DATABASE burger_db;
USE burger_db;

 /*Create a table for the burgers to be saved to:
Boolean can be made false using " DEFAULT FALSE" :
*/
CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(250) NOT NULL,
  burger_ingred VARCHAR(350) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);
