

-- If databse already exists replace it: 
DROP DATABASE IF EXISTS burger_db;

/* Create database: */
CREATE DATABASE burger_db;
USE burger_db;

 /*Create a table for the burgers to be saved to:
Boolean can be made false using " IS FALSE" OR "IS NOT TRUE" :
*/
CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(100) NOT NULL,
  burger_ingred VARCHAR(300),
  devoured BOOLEAN,
  PRIMARY KEY (id)
);
