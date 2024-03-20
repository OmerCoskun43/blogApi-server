"use strict";

module.exports = (req, res, next) => {
  //? FILTER
  const filter = req.query?.filter || {};

  //? SEARCH
  const search = req.query?.search || {};

  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" }; // i = case insensitive

    // { title: { '$regex': 'test 1' } },
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    // { "<field>": { "$regex": "pattern", "$options": "<options>" } }
  }

  //? SORT
  const sort = req.query?.sort || {};

  //? LIMIT
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE);
  //   console.log("limit :>> ", limit);

  //? PAGE
  let page = Number(req.query?.page);
  // page = page > 0 ? page : 1;
  page = page > 0 ? page - 1 : 0;
  //   console.log("page :>> ", page);

  //? SKIP
  let skip = Number(req.query?.skip); //Normalde skipi yazmayız ama ihtiyaç olursa yazarız
  skip = skip > 0 ? skip : page * limit;
  //   console.log("skip :>> ", skip);
  //   console.log("***********************");

  res.getModelList = async function (Model) {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit);
  };

  next();
};
