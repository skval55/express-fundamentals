const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

router.get("/", function (req, res) {
  return res.json(items);
});

router.post("/", function (req, res) {
  newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.json({ added: newItem });
});

router.get("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  res.json({ item: foundItem });
});

router.patch("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  res.json({ item: foundItem });
});

router.delete("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  const index = items.indexOf(foundItem);
  items.splice(index, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
