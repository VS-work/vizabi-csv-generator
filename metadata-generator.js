'use strict';

let _ = require('lodash');
let fs = require('fs');
let async = require('async');
let MongoClient = require('mongodb').MongoClient;
let metadataHardcodedFragment = require('./hardcoded-metadata-fragment.json');

let MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ws_test';

MongoClient.connect(MONGO_URL, (error, db) => {
    async.waterfall([
        (cb) => cb(null, _.extend({}, metadataHardcodedFragment)),
        (metadata, cb) => db.collection('indextrees').find({}, {__v: 0, _id: 0}).toArray((error, records) => {
            metadata.indicatorsTree = _.head(records);
            return cb(null, metadata);
        }),
        (metadata, cb) => db.collection('indexdbs').find({}, {__v: 0, _id: 0}).toArray((error, records) => {
            metadata.indicatorsDB =
                _.chain(records)
                    .indexBy('name')
                    .mapValues((value) => _.omit(value, 'name'))
                    .value();

            return cb(null, metadata);
        }),
        (metadata, cb) => fs.writeFile('metadata.json', JSON.stringify(metadata), (error) => {
            if (error) {
                return cb(error);
            }

            return cb();
        })
    ],
    (error) => {
        if (error) {
            throw error;
        }

        console.log('metadata.json generated');
        process.exit(0);
    });
});