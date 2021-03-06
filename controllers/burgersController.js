const express = require("express");

const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create({name: req.body.name, devour: req.body.devour}, function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  const condition = {id: req.params.id};

  console.log("condition", condition);
  console.log(req.body.devour);
  const updateValues = {
    // change boolean to tiny int
    devour: (req.body.devour === "true" ? 1 : 0)
  };
  console.log(updateValues);
  burger.update(
    updateValues,
    condition,
    function(result) {
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Export routes for server.js to use.
module.exports = router;
