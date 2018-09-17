'use strict';

import express from 'express';
import { getSale, saveSale, updateSale, deleteSale  } from '../controllers/sale.controller.js';

const sale = express.Router();

sale.post('/get', getSale);
sale.post('/save', saveSale);
sale.post('/update/:id', updateSale);
sale.post('/delete/:id', deleteSale);

export default sale;

