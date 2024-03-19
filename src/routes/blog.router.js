const express = require("express");
const router = express.Router();
const { BlogPost, BlogCategory } = require("../controllers/blog.controller");

router.route("/posts").get(BlogPost.list).post(BlogPost.create);

router
  .route("/posts/:id")
  .get(BlogPost.read)
  .delete(BlogPost.delete)
  .put(BlogPost.update)
  .patch(BlogPost.update);

router.route("/categories").get(BlogCategory.list).post(BlogCategory.create);

router
  .route("/categories/:id")
  .get(BlogCategory.read)
  .delete(BlogCategory.delete)
  .put(BlogCategory.update)
  .patch(BlogCategory.update);

module.exports = router;
