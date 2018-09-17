'use strict';
const sql = require('mssql');

var config = {
    user: 'dboBI',
    password: 'UserSQL',
    server: '172.10.1.4',
    database: 'DWH_BI'
};

sql.connect( config, function (err, result ) {

    if (err){
        return console.log(err);
    }

    new sql.Request().query('SELECT * FROM DIM_TIEMPO WHERE AÑO = 2018 AND MES = 1 AND DIA BETWEEN 1 AND 5', function (err, result) {
        console.log(JSON.stringify(result.recordset.length + ' - ' + result.recordsets.length));
    });

});
