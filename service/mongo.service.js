const config = require('./config.service');

const { MongoClient } = require("mongodb");
const config = require('./config.service');

const client = new MongoClient(config.mongo_url, { useUnifiedTopology: true });
client.connect();

async function saveMemoryData(memFree) {
    console.log('memFree:', memFree);
    let tstamp = Date.now();
    const result = await client.db(config.mongo_db)
        .collection(config.mongo_coll)
        .insertOne({ t: tstamp, mem: memFree });
    //console.log(`result: ${result}`);
}

module.exports.saveMemoryData = saveMemoryData;