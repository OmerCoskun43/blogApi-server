"use strict";
require("express-async-errors");

const User = require("../models/user.model");

module.exports = {
  list: async (req, res) => {
    const data = await User.find().sort({ createdAt: -1 });
    res.status(200).send({
      error: false,
      message: "Users listed succesfully",
      data,
    });
  },
  create: async (req, res) => {
    const data = req.body;
    const createdData = await User.create(data);

    res.status(201).send({
      error: false,
      message: "User created succesfully",
      data: createdData,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });

    res.status(202).send({
      error: false,
      message: "User listed succesfully",
      data,
    });
  },
  update: async (req, res) => {
    const data = req.body;
    await User.updateOne({ _id: req.params.id }, data);

    res.status(202).send({
      error: false,
      message: "User updated succesfully",
      data,
    });
  },
  delete: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });

    const deletedData = await User.deleteOne({ _id: req.params.id });

    console.log(deletedData.deletedCount);
    res.status(deletedData.deletedCount ? 202 : 404).send({
      error: deletedData.deletedCount ? false : true,
      message: deletedData.deletedCount
        ? "User deleted succesfully"
        : "Data cannot deleted",
      data,
    });
  },
};
