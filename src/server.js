require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./public"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running on port", port);
});
