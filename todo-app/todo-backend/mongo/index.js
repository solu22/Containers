const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')


mongoose
  .connect(MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log('database connected'))
  .catch((error) => console.log(error));


module.exports = {
  Todo
}
