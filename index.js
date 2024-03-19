"use strict";
//! PROJECT REQUIREMENTS
const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const { errorHandler } = require("./src/middlewares/error");
const { dbConnection } = require("./src/configs/dbConnection");
// const sync = require("./src/sync.js");

//! .ENV VARIABLES
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";

//! USING MIDDLEWARES
//* (HTTP isteklerindeki JSON verilerini ayrıştırmak(parse etmek) için kullanılır. bir POST isteği yapıldığında, express.json() middleware otomatik olarak istek gövdesinden JSON verilerini ayrıştırır ve bu verileri req.body nesnesinde sunucu tarafında erişilebilir hale getirir.)
app.use(express.json());

//! DATABASE CONNECTION
//* Bu fonksiyon, mongoose.connect() ile veritabanına baglanır. O yüzden veri tabanı ile işlem yapmadan önce yani üst satırda olması gerekir.
dbConnection();

//! Cookies
//* cookie-session, Node.js ortamında yaygın olarak kullanılan bir pakettir. Bu paket, HTTP oturumlarını yönetmek için kullanılır ve oturum verilerini çerezlerde saklar. Node.js uygulamalarında oturum yönetimi için yaygın olarak tercih edilen bir yöntemdir.
const session = require("cookie-session");
app.use(
  session({
    secret: process.env.SECRET_KEY,
    // maxAge: 1000 * 60 * 60 * 24 * 3,  --3gün duracak cookiesler
  })
);

app.use(require("./src/middlewares/userControl"));
//! ROUTES
app.all("/", (req, res) => {
  if (req.isLogin) {
    res.send({
      error: false,
      message: "Welcome to The Blog API!",
      session: req.session,
      user: req.user,
    });
  } else {
    res.send({
      error: false,
      message: "Welcome to The Blog API!",
      session: req.session,
    });
  }
});

app.use("/blog", require("./src/routes/blog.router"));
app.use("/user", require("./src/routes/user.router"));

//! Geçmiş Kayıtları yeni modelime göre güncellemek için Syncronize fonksiyonu tanımladık ve burada bir kere çalıştırıyoruz. Yani modelimiz de 3 field vardı sonradan 1 field daha ekledik o zaman bu fonksiyonu kullanıyoruz.
// sync();

app.use(errorHandler); // aşağıda olacak en aşağıda olsun.
//! SERVER SETUP
app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});
