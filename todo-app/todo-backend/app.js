const express = require("express");
//onst { connectDB } = require('./mongo/index')
const logger = require("morgan");
const cors = require("cors");

const { connectDB } = require("./mongo");
const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");
// const statRouter = require("./routes/stats");

const app = express();
require("./mongo/index");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todosRouter);
// app.use('/statistics', statRouter);

module.exports = app;
