const express = require("express");
const router = require("./src/router");
const models = require("./src/Models");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config()
let PORT=process.env.PORT || 8888

const app = express();
app.use(cors({
  origin: 'https://shoponlinefront.herokuapp.com',
  // origin:"http://localhost:3000"
}));
app.use(express.static(__dirname))
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/", router);
app.use((req, res) => {
  res.status(405).send({ m: "not found" });
});

app.listen(PORT, () => {
  console.log("Server running on 8888");
});
