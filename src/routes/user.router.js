"use strict";
const express = require("express");
const router = express.Router();
const User = require("../controllers/user.controller");

router.route("/").get(User.list).post(User.create);

router.post("/login", User.login);
router.all("/logout", User.logout);

router
  .route("/:id")
  .get(User.read)
  .delete(User.delete)
  .put(User.update)
  .patch(User.update);

module.exports = router;
