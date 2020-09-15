import mssql from 'mssql';

export const config = {
    user: 'eskatusa_admin',
    password: 'Eskat_1234',
    server: '190.8.176.202', 
    database: 'eskatusa_Empresas',
    options:{
        encrypt: false,
        enableArithAbort: false       
    }
}

export const config1 = {
    user: 'eskatusa_admin',
    password: 'Eskat_1234',
    server: '190.8.176.202', 
    database: '',
    options:{
        encrypt: false,
        enableArithAbort: false         
    }
}

const sql = new mssql.ConnectionPool(config);

sql.connect(err => {
    if(err)
        console.log("Error de conexión")    
    else
        console.log("Conectado a la Base")    
})

/*
new mssql.ConnectionPool(config).connect().then(pool => {
    return pool
}).then(result => {
    console.dir(result)
}).catch(err => {
    console.dir("ewwsdddd")
    // ... error checks
})
*/
