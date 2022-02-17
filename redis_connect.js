const redis = require("redis");

//connect to redis

const redis_client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

redis_client.on("connect", () => {
  console.log("redis client connected");
});

module.exports = redis_client;
