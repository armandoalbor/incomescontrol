'use strict';
import Sale from '../models/sale.model';

export const getSale = (req, res)=>{
    const params = req.body;
    
    let find = {};
    if (params.date) find.date = params.date;
    if (params.total) find.total = params.total;
    if (typeof params.active !== "undefined") find.active = params.active;
    
    Sale.find(find).populate({ path: 'products.product' }).then((data)=>{
        if(data.length === 0){
            return  res.status(404).send({ error:false, message:"No hay coincidencias para la busqueda", status:404, response: { sales: [] } });
        }
        res.status(200).send({ error:false, message:"Operación de busqueda exitosa", status:200, response:{ sales:data }});
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});
    });
}

export const saveSale = (req, res)=>{
    const sale = new Sale();
    const params = req.body;

    console.log("Sale body,", req.body);

    if(!params.products || typeof params.subtotal === "undefined" || typeof params.total === "undefined" ){
        return res.status(400).send({ message: "La información de la Venta esta incompleta" });
    }

    sale.products = params.products;
    sale.description = params.description;
    sale.subtotal = params.subtotal;
    sale.total = params.total;
    sale.date = params.date || new Date();

    sale.save().then((savedSale)=>{
        res.status(200).send({ error:false, message:"Operación exitosa", status:200, response:{ sale:savedSale }});
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno, " + err, status:500, response: {}});
    });
}

export const updateSale = (req, res)=>{
    const saleId = req.params.id;
    const update = req.body;
    update.update = new Date();

    Sale.findByIdAndUpdate(saleId, update).then((saleUpdated)=>{
        res.status(200).send({ error:false, message:"Operación exitosa", status:200, response:{ sale:saleUpdated }});
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});        
    });
}

export const deleteSale = (req, res)=>{
    const saleId = req.params.id;
    const update = req.body;
    update.update = new Date();
    update.active = false;

    Sale.findByIdAndUpdate(saleId, update).then((saleRemoved)=>{
        res.status(200).send({ error:false, message:"Operación exitosa", status:200, response:{ sale:saleRemoved }});
    }).catch((err)=>{
        res.status(500).send({ error:true, message:"Ha ocurrido un error interno", status:500, response: {}});        
    });
}