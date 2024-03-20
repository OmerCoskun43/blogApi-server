"use strict";
require("express-async-errors");

const User = require("../models/user.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    // const data = await User.find().sort({ createdAt: -1 });
    const data = await getModelList(User);
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
    const updateData = await User.findOne({ _id: req.params.id });

    res.status(202).send({
      error: false,
      message: "User updated succesfully",
      data: updateData,
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

  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });
      if (user && user.password == passwordEncrypt(password)) {
        // req.session = {
        //   email: user.email,
        //   password: user.password,
        // };

        req.session.id = user._id;
        req.session.password = user.password;

        if (req.body?.remindMe) {
          req.session.remindMe = req.body.remindMe;
          // SET maxAge
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
        }

        res.status(200).send({
          error: false,
          message: "Login succesfuly",
          user,
        });
      } else {
        res.statusCode = 401;
        throw new Error("Password or Email is not valid");
      }
    } else {
      res.statusCode = 401;
      throw new Error("Email and password are required");
    }
  },
  logout: async (req, res) => {
    req.session = null;

    res.status(200).send({
      error: false,
      message: "Logout OK",
    });
  },
};
