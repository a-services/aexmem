const { MongoClient } = require("mongodb");
const config = require('./config.service');

const client = new MongoClient(config.mongo_url, { useUnifiedTopology: true });
client.connect();

async function saveMemoryData(memFree) {
    console.log('memFree:', memFree);
    const result = await client.db(config.mongo_db)
        .collection(config.mongo_coll)
        .insertOne({ t: new Date(), mem: memFree });
}

module.exports.saveMemoryData = saveMemoryData;