/**
 * Created by mooner00 on 9/13/2016.
 */
var redis = require('redis');
var config = require('./../config/appConfig');

var client = redis.createClient(config.redis.client);

module.exports = client;