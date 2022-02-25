const mongoose = require('mongoose')
const Todo = require('./models/Todo')
//const { MONGO_URL } = require('../util/config')


mongoose
  .connect('mongodb://the_username:the_password@127.0.0.1:3456/the_database', { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false})
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));


module.exports = {
  Todo
}
