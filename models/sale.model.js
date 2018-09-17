'use strict';

import mongoose from 'mongoose';
const newSchema = mongoose.Schema;

const Sale = newSchema({
    products: [{ quantity: { type: Number, default: 1 }, product: { type: newSchema.ObjectId, ref: 'Product' } }],
    description: { type: String, default: '' },
    subtotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    date: { type: Date, default: new Date()},
    active: { type: Boolean, default: true },
    create: { type: Date, default: new Date()},
    update: { type: Date, default: new Date()}
},
{
    collection: 'sales'
});

export default mongoose.model('Sale', Sale);