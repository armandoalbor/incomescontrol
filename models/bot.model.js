'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BootSchema = Schema({
    name: { type: String, default: 'BootDefault' },
    model: { type: Number, default: 2018 },
    create: { type: Date, default: new Date()}
},
{
    collection: 'boots'
});

module.exports = mongoose.model('Boot', BootSchema);