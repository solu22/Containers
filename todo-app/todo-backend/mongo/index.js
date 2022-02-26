const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { MONGO_URL } = require("../util/config");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    bufferMaxEntries: 0,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

module.exports = {
  Todo,
};
