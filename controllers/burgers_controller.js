const express = require("express");

const router = express.Router();

// Import the model (burgers.js) to use its database functions.
const burgers = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.


/** Route for showing the main page with a menu where you can view burgers
 * You can add a burger
 * You can add you burger to favorites
 * You can devour a burger of your choice
 */
router.get("/", (req, res) => {

  burgers.all(function(data) {

    // Must be placed in an object varible to be accessed correctly, shows up as objects otherwise
    const hbsObject = {

      burgers: data,
      style: "index"
    };
    console.log(hbsObject);
    
    res.render("index", hbsObject);
  });
});


/**Route for showing the user the favorites page where they have their burgers saved*/
router.get('/favorites', (req, res) => {
  orm.all('favorite', true, function (error, data) {

    const hbsObject = {

      burgers: data,
      style: "favorites"
    };

      if (error) {
          return res.render('error');
      }

      res.render("favorites", hbsObject);
  });
});


/**Route for show the user all burgers that have been createdd and splits them into two different categories*/
router.get('/all', (req, res) => {
  orm.all(function (data) {

    const hbsObject = {

      burgers: data,
      style: "all",
      header:"All Burgers"
    };

      res.render("allBurgers",hbsObject);
  });
});


/** Route for handling adding a new Burger */
router.post("/api/burgers",(req, res) => {
  burgers.create([

    "burger_name", "burger_ingred","devoured","favorite"

  ],
   [
    req.body.burger_name, req.body.burger_ingred,req.body.devoured,req.body.favorite
  ],
   function(result) {

    // Send back the ID of the new quote
    res.json({ result });

  });
});


/** Route for handling updating burgers */
router.put("/api/burgers/:id",(req, res) => {

  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update({

    burger_name: req.body.burger_name,
    burger_ingred: req.body.burger_ingred,
    devour: req.body.devour,
    favorite: req.body.favorite

  }, 
  condition, function(result) {

    if (result.changedRows == 0) {

      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();

    } else {

      res.status(200).end();
    }
  });
});


/**Route for handling the removal of burgers */
router.delete("/api/burgers/:id",(req, res) => {

  const condition = "id = " + req.params.id;

  burgers.delete(condition, function(result) {

    if (result.affectedRows == 0) {

      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();

    } else {

      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
