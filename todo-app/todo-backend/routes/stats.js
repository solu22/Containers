const express = require('express');
const router = express.Router();
const redisClient = require('../redis');

router.get('/', async(_, res)=>{
    const value = await redisClient.getAsync("count");
    return res.json({
        "added_todos": value || "0"
    })
});


module.exports = router;
