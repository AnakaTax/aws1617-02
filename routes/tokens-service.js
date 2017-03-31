'use strict';

var MongoClient = require('mongodb').MongoClient;
var db;
var jwt = require('jwt-simple');  
var moment = require('moment');
var config = require('./config');

const Tokens = function () {};

Tokens.prototype.connectDb = function(callback) {
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.collection('tokens');

        callback(err, database);
    });
};

Tokens.prototype.add = function(token, callback) {
    return db.insert(token, callback);
};

Tokens.prototype.get = function(dni, callback) {
    return db.find({dni:dni}).toArray(callback);
};

Tokens.prototype.remove = function(dni, callback) {
    return db.remove({dni:dni},{ multi: true}, callback);
};

Tokens.prototype.createToken = function(user) {  
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

module.exports = new Tokens();
