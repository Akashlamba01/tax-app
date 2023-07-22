const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/taxData", {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
  })
  .then(() => console.log("Connection Connected"))
  .catch((error) => {
    console.log("Not Connected");
  });
