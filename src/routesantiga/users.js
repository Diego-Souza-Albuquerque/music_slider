/* const express = require("express");

const router = express.Router();

const Users = require("../models/users");

router.get("/users", async (req, res) => {
  try {
    let users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    let users = await Users.findById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.post("/users", async (req, res) => {
  let { name } = req.body;
  try {
    let users = await Users.create({ name });
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/users/:id", async (req, res) => {
  let { name } = req.body;
  try {
    let users = await Users.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
 */
