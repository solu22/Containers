const { RedisClient } = require("redis");
const { promisify } = require("util");
const { REDIS_URL } = require("../util/config");

let getAsync;
let setAsync;

const client = new RedisClient({ url: REDIS_URL });

getAsync = promisify(client.get).bind(client);
setAsync = promisify(client.set).bind(client);

module.exports = {
  getAsync,
  setAsync,
};
