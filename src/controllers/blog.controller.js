const { BlogPost, BlogCategory } = require("../models/blog.model");
require("express-async-errors");

module.exports.BlogPost = {
  list: async (req, res) => {
    // Filtering & Searching & Sorting & Pagination

    // //? FILTER
    // const filter = req.query?.filter || {};

    // //? SEARCH
    // const search = req.query?.search || {};

    // for (let key in search) {
    //   search[key] = { $regex: search[key], $options: "i" }; // i = case insensitive

    //   // { title: { '$regex': 'test 1' } },
    //   // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    //   // { "<field>": { "$regex": "pattern", "$options": "<options>" } }
    // }

    // //? SORT
    // const sort = req.query?.sort || {};

    // //? LIMIT
    // let limit = Number(req.query?.limit);
    // limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE);
    // console.log("limit :>> ", limit);

    // //? PAGE
    // let page = Number(req.query?.page);
    // // page = page > 0 ? page : 1;
    // page = page > 0 ? page - 1 : 0;
    // console.log("page :>> ", page);

    // //? SKIP
    // let skip = Number(req.query?.skip); //Normalde skipi yazmayız ama ihtiyaç olursa yazarız
    // skip = skip > 0 ? skip : page * limit;
    // console.log("skip :>> ", skip);
    // console.log("***********************");

    // const data = await BlogPost.find(filter);
    // const data = await BlogPost.find({ ...filter, ...search })
    //   .sort(sort)
    //   .skip(skip)
    //   .limit(limit);

    const data = await res.getModelList(BlogPost, "blogCategoryId");

    // const data = await BlogPost.find();
    res.status(200).send({
      error: false,
      message: "Posts listed succesfully",
      details: await res.getModelListDetails(BlogPost),
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
    const data = await BlogPost.findOne({ _id: req.params.id }).populate(
      "blogCategoryId"
    );

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
    // const data = await BlogCategory.find().sort({ createdAt: -1 });
    const data = await res.getModelList(BlogCategory);
    res.status(200).send({
      error: false,
      message: "Categorys listed succesfully",
      details: await res.getModelListDetails(BlogCategory),
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
