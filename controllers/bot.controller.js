'use strict';

var Bot = require('../models/bot.model.js');

function buildBot(req, res) {

    var clientName = req.params.botName;

    var bot = new Bot();
    bot.name = clientName;
    bot.model = 3009;

    bot.save(function (err, botSaved) {
        if(err){
            res.status(500).send({
                message: 'Error request on save in Mongo',
                error: err
            });
        }else {
            res.status(200).send({
                message: 'Success request',
                bot: botSaved
            });
        }
    });
}

function buildBots(req, res) {

    var totalBots = req.params.totalBots;
    var bots = [];

    for(var i=0; i<totalBots; i++){
        console.log('BotCreated=' + i );
        var bot = new Bot();

        bot.name = 'Bot 00' + i;
        bot.model = 3009;
        bots.push(bot);

        if(bots.length == totalBots){
            Bot.create(bots, function (err, botsSaved) {
                if(err){
                    res.status(500).send({
                        message: 'Error request on save in Mongo',
                        error: err
                    });
                }else {

                    if(bots.length < 100){
                        res.status(200).send({
                            message: 'Success request',
                            bots: botsSaved
                        });
                    }else {
                        res.status(200).send({
                            message: 'Success request',
                            bots: bots.length
                        });
                    }
                }
            });
        }
    }
}

function getBots(req, res) {
    var params = req.body;
    var find = {};

    console.log("Hello World on NodeJs");
    console.log(params);
    console.log(req.body);

    if(params._id){
        find._id = params._id;
    }

    if(params.name){
        find.name = params.name;
    }
    
    Bot.find(find).limit(50).sort({name:1}).exec(function (err, bots) {
        if (err) {
            res.status(500).send({ message:'Error request', date: new Date() });
        }
        else {
            if(bots.length > 0){
                res.status(200).send({ message:'Success request', date: new Date(), bots:bots });
            }
            else {
                res.status(404).send({ message:'No bots found', date: new Date() });
            }
        }
    });
}

module.exports.buildBot = buildBot;
module.exports.buildBots = buildBots;
module.exports.getBots = getBots;