const mongoose = require("mongoose");

const databaseConnected = mongoose
  .connect(`mongodb+srv://mittalm904:${process.env.Mongo_Pass}@cluster0.typsais.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .catch((err) => console.log(err))
  .then((data) => console.log("Database Connection is Established"));

  module.exports= databaseConnected;