//?  errorhandler middleware'i, Express.js uygulamalarında hata işleme ve hata raporlama işlevlerini kolaylaştıran bir modüldür. Bu middleware, özellikle geliştirme aşamasında hata ayıklama sürecini daha verimli hale getirmek için kullanılır.

//?  Temel olarak, errorhandler middleware'i, Express uygulamasında herhangi bir yerde oluşan bir hata durumunu ele alır. Eğer bir hata oluşursa, bu middleware hata nesnesini alır, gerekirse bu hatayı kaydeder ve istemciye uygun bir yanıt döndürür. Hata durumuna bağlı olarak, kullanıcıya hata hakkında bilgilendirici mesajlar veya hata detayları sunabilir.

module.exports = {
  errorHandler: (error, req, res, next) => {
    const errorStatusCode = res.errorStatusCode || 500;
    console.log("ErrorHandler Worked !!!");

    res.status(errorStatusCode).json({
      error: true,
      message: error.message,
      cause: error.cause,
    });
  },
};
