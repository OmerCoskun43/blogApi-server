"use strict";
const { mongoose } = require("../configs/dbConnection");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

const BlogPost = mongoose.model("BlogPost", blogSchema);

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, collection: "blogCategories" }
);

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

module.exports = {
  BlogPost,
  BlogCategory,
};
