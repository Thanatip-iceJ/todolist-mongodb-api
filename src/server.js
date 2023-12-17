require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const connect = require("./config/connectDB");
const notFound = require("./middlewares/not-found");
const error = require("./middlewares/error");
const todoRoute = require("./routes/todoRoute");

// DBconnect
connect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./public"));

app.use("/todo", todoRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT;
mongoose.connection.once("open", () => {
  app.listen(port, () => {});
});
