'use strict';
import Product from '../models/product.model';

export const getProduct = (req, res)=>{
    const params = req.body;
    
    let find = {};
    if (params.name) find.name = params.name;
    if (params.description) find.description = params.description;
    if (params.cost) find.cost = params.cost;
    if (params.price) find.price = params.price;
    if (typeof params.active !== "undefined") find.active = params.active;

    Product.find(find).then((data)=>{
        if(data.length === 0){
            return  res.status(404).send({ error:false, message:"No hay coincidencias para la busqueda", status:404, response: { producta: [] } });
        }
        res.status(200).send({ error:false, message:"Operación de busqueda exitosa", status:200, response:{ products:data }});
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});
    });
}

export const saveProduct = (req, res)=>{
    const product = new Product();
    const params = req.body;

    if(!params.name || typeof params.cost === "undefined" || typeof params.price === "undefined" ){
        return res.status(400).send({ message: "La información del Producto esta incompleta" });
    }

    product.name = params.name;
    product.description = params.description;
    product.cost = params.cost;
    product.price = params.price;

    Product.find({name:product.name}).then((data)=>{
        if(data.length > 0){
            return  res.status(400).send({ error:true, message:"El producto ya existe", status:400, response: { product: data } });
        }
        product.save().then((savedProduct)=>{
            res.status(200).send({ error:false, message:"Operación exitosa", status:200, response:{ product:savedProduct }});
        }).catch((err)=>{
            res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});
        });
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});
    });
}

export const updateProduct = (req, res)=>{
    const productId = req.params.id;
    const update = req.body;
    update.update = new Date();

    Product.findByIdAndUpdate(productId, update).then((productUpdated)=>{
        res.status(200).send({ error:false, message:"Operación exitosa", status:200, response:{ product:productUpdated }});
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});        
    });
}

export const deleteProduct = (req, res)=>{
    const productId = req.params.id;
    const update = req.body;
    update.update = new Date();
    update.active = false;

    Product.findByIdAndUpdate(productId, update).then((productRemoved)=>{
        res.status(200).send({ error:false, message:"Operación exitosa", status:200, response:{ product:productRemoved }});
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});        
    });
}