"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config1 = exports.config = void 0;
const mssql_1 = __importDefault(require("mssql"));
exports.config = {
    user: 'eskatusa_admin',
    password: 'Eskat_1234',
    server: '190.8.176.202',
    database: 'eskatusa_Empresas',
    options: {
        encrypt: false,
        enableArithAbort: false
    }
};
exports.config1 = {
    user: 'eskatusa_admin',
    password: 'Eskat_1234',
    server: '190.8.176.202',
    database: '',
    options: {
        encrypt: false,
        enableArithAbort: false
    }
};
const sql = new mssql_1.default.ConnectionPool(exports.config);
sql.connect(err => {
    if (err)
        console.log("Error de conexión");
    else
        console.log("Conectado a la Base");
});
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
//# sourceMappingURL=database.js.map