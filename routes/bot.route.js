'use strict';

var express = require('express');
var botController = require('../controllers/bot.controller.js');

var bot = express.Router();

bot.get('/bot/build/:botName', botController.buildBot);
bot.get('/bot/build/masive/:totalBots', botController.buildBots);
bot.post('/bot/test', botController.getBots);


module.exports = bot;

