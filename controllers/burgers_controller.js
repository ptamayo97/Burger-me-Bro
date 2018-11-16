let express = require("express");

let router = express.Router();

// Import the model (burgers.js) to use its database functions.
let burgers = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {

  burgers.all(function(data) {

    // Must be placed in an object varible to be accessed correctly, shows up as objects otherwise
    let hbsObject = {

      burgers: data,
      style: "index"
    };
    console.log(hbsObject);
    
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burgers.create([

    "burger_name", "burger_ingred","devoured","favorite"

  ],
   [
    req.body.burger_name, req.body.burger_ingred,
  ],
   function(result) {

    // Send back the ID of the new quote
    res.json({ id: result.insertId });

  });
});

router.put("/api/burgers/:id", function(req, res) {

  let condition = "id = " + req.params.id;

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

router.delete("/api/burgers/:id", function(req, res) {

  let condition = "id = " + req.params.id;

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
