'use strict';

let fs = require('fs');
let request = require('request');

const WS_URL = process.env.WS_URL || 'http://waffle-server-dev.gapminderdev.org';
const METADATA_URL = `${WS_URL}/api/vizabi/metadata.json`;

request(METADATA_URL, (err, res, body) => {
    if (err) {
        throw err;
    }

    fs.writeFile('metadata.json', body, (err) => {
        if (err) {
            throw err;
        }

        process.exit(0);
        console.log('metadata.json generated');
    })
});
