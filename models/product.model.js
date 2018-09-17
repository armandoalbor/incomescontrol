'use strict';

import mongoose from 'mongoose';
const newSchema = mongoose.Schema;

const Product = newSchema({
    name: { type: String, default: 'BootDefault' },
    description: { type: String, default: 'BootDefault' },
    cost: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    create: { type: Date, default: new Date()},
    update: { type: Date, default: new Date()}
},
{
    collection: 'products'
});

export default mongoose.model('Product', Product);