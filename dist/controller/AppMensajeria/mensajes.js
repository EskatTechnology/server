"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mensajes = void 0;
class Mensajes {
    constructor() {
        this.validarMensajes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //config1.database = req.header('Base') as string;
            console.log(req + "aaaaaaaa");
            /*await new mssql.ConnectionPool(config1).connect().then(pool => {
                return pool.request()
                .input('idUsuario', mssql.Int, req.params)
                .execute('ValidarMensajes')
            }).then(async result => {
                if(result.recordset.length > 0 ){
                    const data = result.recordset;
                    res.status(200).json(data);
                }
            }).catch(err => {
                    res.status(404).json({Error: err.message});
            })  */
        });
    }
}
exports.Mensajes = Mensajes;
//# sourceMappingURL=mensajes.js.map