const mongoose = require("mongoose");
const { MONGO_URL } = require("../util/config");

mongoose.connect(MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>console.log(`Mondodb connected @ ${MONGO_URL}`)).catch((error)=> console.log('mongo-error', error))




