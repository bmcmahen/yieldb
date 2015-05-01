
var mongodb = require('mongodb')
var mongo = mongodb.MongoClient;
var debug = require('debug')('yieldb');
var Db = require('./db');
var Collection = require('./collection');
var mquery = require('mquery');

exports.connect = function(uri, opts) {
  return connectToMongo(uri, opts)
    .then(function(nativeDb){
      debug('connected to %s', uri.replace(/\/\/([^@]+)@/, '//{AUTH}@'));
      return Db.init(nativeDb);
    });
};

exports.Db = Db;
exports.Collection = Collection;
exports.mongodb = mongodb;
exports.mquery = mquery;

/**
 * @api private
 */

function connectToMongo(uri, opts) {
  return new Promise(function(resolve, reject){
    mongo.connect(uri, opts || {}, function(err, db){
      if (err) return reject(err);
      resolve(db);
    });
  });
}
