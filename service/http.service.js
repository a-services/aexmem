const http = require('http');
const mongo = require('./mongo.service');

function tick() {
    const req = http.get({
        host: 'northwell.dev.appery.io',
        path: '/apiexpress-api/status/available-memory'
    },
        (res) => {
            let content = '';
            res.on('data', (chunk) => {
                content += chunk;
            });
            res.on('end', () => {
                memoryCheck(JSON.parse(content));
            });
        });
    req.on('error', (err) => {
        console.error('[ERROR]', err);
    });
    req.end();
}

function memoryCheck(mem) {
    var memFree = mem.max - mem.total + mem.free;
    mongo.saveMemoryData(memFree)
}

module.exports.tick = tick;