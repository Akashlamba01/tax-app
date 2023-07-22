const express = require("express");
const connection = require("./config/db");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get('/', (req, res) => {
//     console.log('hello world');
// })

app.use("/", require("./routes"));
app.use(errors());

app.listen(PORT, () => {
  console.log("Surver is running on the port:", PORT);
});
