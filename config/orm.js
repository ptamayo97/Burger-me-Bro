// Import MySQL connection.
let connection = require("../config/connection.js");

/** Helper function for SQL syntax.
 * Let's say we want to pass 3 values into the mySQL query.
 * In order to write the query, we need 3 question marks.
 * The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
 * ["?", "?", "?"].toString() => "?,?,?"; */
function printQuestionMarks(num) {

  let arr = [];

  for (let i = 0; i < num; i++) {

    arr.push("?");

  }

  return arr.toString();
}

/** Helper function to convert object key/value pairs to SQL syntax */
function objToSql(ob) {

  let arr = [];

  // loop through the keys and push the key/value as a string in arr
  for (let key in ob) {

    let value = ob[key];

    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {

      // if string with spaces, add quotations e.g. {name: 'Chicken BBQ Burger'} => ["name='Chicken BBQ Burger'"]
      if (typeof value === "string" && value.indexOf(" ") >= 0) {

        value = "'" + value + "'";
      }

      // e.g. {devour: true} => ["devour=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
let orm = {

  /** Function to select all things within the given table*/
  all: function(burgerInput, cb) {

    let queryString = "SELECT * FROM " + burgerInput + ";";

    connection.query(queryString, function(err, result) {

      if (err) {
        throw err;

      }

      cb(result);

    });



  },

  one: function(burgerInput,col,val, cb) {

    let queryString = "SELECT * FROM " + burgerInput + " WHERE " + col + " = " + val + ";"

    console.log(queryString)

    connection.query(queryString, function(err, result) {

      if (err) {
        throw err;

      }

      cb(result);

    });



  },
  /** *Here is the function to take the burger you created and add it into the database */
  create: function(table, cols, vals, cb) {

    // Creates a string for the mysql data to be INSERTED
    let queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });


  },

  /**  An example of objColVals would be {name: Big Beef Burger, favorite: true} 
   * Function to make changes to the burger list like adding to your favorite or devouring */
  update: function(table, objColVals, condition, cb) {

    // Creates a string for the mysql data to be UPDATED
    let queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE "; 
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });


  },
  /** Here is the function to delete any burgers the user is tired of eating */
  delete: function(table, condition, cb) {

    // Creates a string for the mysql data to be DELETED
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {

      if (err) {
        throw err;

      }

      cb(result);
      
    });
  }
};

// Export the orm object for the model (burgers.js).
module.exports = orm;