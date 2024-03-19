const { BlogPost, BlogCategory } = require("../models/blog.model");
require("express-async-errors");

module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).send({
      error: false,
      message: "Posts listed succesfully",
      data,
    });
  },
  create: async (req, res) => {
    const data = req.body;
    const createdData = await BlogPost.create(data);

    res.status(201).send({
      error: false,
      message: "Post created succesfully",
      data: createdData,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.id });

    res.status(202).send({
      error: false,
      message: "Post listed succesfully",
      data,
    });
  },
  update: async (req, res) => {
    const data = req.body;
    await BlogPost.updateOne({ _id: req.params.id }, data);

    res.status(202).send({
      error: false,
      message: "Post updated succesfully",
      data,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.id });

    const deletedData = await BlogPost.deleteOne({ _id: req.params.id });

    console.log(deletedData.deletedCount);
    res.status(deletedData.deletedCount ? 202 : 404).send({
      error: deletedData.deletedCount ? false : true,
      message: deletedData.deletedCount
        ? "Post deleted succesfully"
        : "Data cannot deleted",
      data,
    });
  },
};

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find().sort({ createdAt: -1 });
    res.status(200).send({
      error: false,
      message: "Categorys listed succesfully",
      data,
    });
  },
  create: async (req, res) => {
    const data = req.body;
    const createdData = await BlogCategory.create(data);

    res.status(201).send({
      error: false,
      message: "Category created succesfully",
      data: createdData,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.findOne({ _id: req.params.id });

    res.status(202).send({
      error: false,
      message: "Category listed succesfully",
      data,
    });
  },
  update: async (req, res) => {
    const data = req.body;
    await BlogCategory.updateOne({ _id: req.params.id }, data);

    res.status(202).send({
      error: false,
      message: "Category updated succesfully",
      data,
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.findOne({ _id: req.params.id });

    const deletedData = await BlogCategory.deleteOne({ _id: req.params.id });

    console.log(deletedData.deletedCount);
    res.status(deletedData.deletedCount ? 202 : 404).send({
      error: deletedData.deletedCount ? false : true,
      message: deletedData.deletedCount
        ? "Category deleted succesfully"
        : "Data cannot deleted",
      data,
    });
  },
};
