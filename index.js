"use strict";
//! PROJECT REQUIREMENTS
const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const { errorHandler } = require("./src/middlewares/error");
const { dbConnection } = require("./src/configs/dbConnection");
const sync = require("./src/sync.js");

//! .ENV VARIABLES
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";

//! USING MIDDLEWARES
//* (HTTP isteklerindeki JSON verilerini ayrıştırmak(parse etmek) için kullanılır. bir POST isteği yapıldığında, express.json() middleware otomatik olarak istek gövdesinden JSON verilerini ayrıştırır ve bu verileri req.body nesnesinde sunucu tarafında erişilebilir hale getirir.)
app.use(express.json());
app.use(errorHandler);

//! DATABASE CONNECTION
//* Bu fonksiyon, mongoose.connect() ile veritabanına baglanır. O yüzden veri tabanı ile işlem yapmadan önce yani üst satırda olması gerekir.
dbConnection();
//! ROUTES
app.all("/", (req, res) => {
  res.send("Welcome to The Blog API!");
});

app.use("/blog", require("./src/routes/blog.route"));

//! Geçmiş Kayıtları yeni modelime göre güncellemek için Syncronize fonksiyonu tanımladık ve burada bir kere çalıştırıyoruz.
// sync();

//! SERVER SETUP
app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});
