const express = require("express");
const router = require("./src/router");
const models = require("./src/Models");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
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

app.listen(8888, () => {
  console.log("Server running on 8888");
});
