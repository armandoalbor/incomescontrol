'use strict';

import express from 'express';
import { getProduct, saveProduct, updateProduct, deleteProduct  } from '../controllers/product.controller.js';

const product = express.Router();

product.post('/get', getProduct);
product.post('/save', saveProduct);
product.post('/update/:id', updateProduct);
product.post('/delete/:id', deleteProduct);

export default product;

