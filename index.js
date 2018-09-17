'use strict';

import app from './app';
import http from 'http';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;
const port = 8080;

app.set('port', port);
const server = http.createServer(app);
// const strConn = 'mongodb://localhost:27017/bots';
const strConn = "mongodb://admin:admin@cluster0-shard-00-01-rgvzf.mongodb.net:27017/incomes?ssl=true&replicaSet=Cluster0-shard-0&retryWrites=true&authSource=admin&ext.ssl.certFile=undefined";

mongoose.connect(strConn)
    .then(()=>{
        server.listen(port, ()=> {
            console.log('The server has listening on port: ' + port);
        });
    }).catch((err)=>{
        if (err) console.error(err);
    }
);


