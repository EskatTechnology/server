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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.logout = exports.login = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../lib/database");
const verifyToken_1 = require("../lib/verifyToken");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new mssql_1.default.ConnectionPool(database_1.config).connect().then(pool => {
        return pool.request()
            .input('Usuario', mssql_1.default.VarChar, req.body.User)
            .input('Contraseña', mssql_1.default.VarChar, req.body.Pass)
            .execute('LoginEmpresa');
    }).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result.recordset.length > 0) {
            const data = result.recordset;
            const id = '0';
            const token = yield verifyToken_1.CrearToken(id, req);
            res.status(200).header({ 'Token': token.token, 'Refresh': token.refreshToken }).json(data);
        }
        else {
            new mssql_1.default.ConnectionPool(database_1.config).connect().then(pool => {
                return pool.request()
                    .input('Usuario', mssql_1.default.VarChar, req.body.User)
                    .input('Contraseña', mssql_1.default.VarChar, req.body.Pass)
                    .execute('LoginPersona');
            }).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                if (result.recordset.length > 0) {
                    const data = result.recordset;
                    const id = result.recordset[0].IdUsuario;
                    const token = yield verifyToken_1.CrearToken(id, req);
                    res.status(200).header({ 'Token': token.token, 'Refresh': token.refreshToken }).json(data);
                }
                else {
                    res.status(205).json({ Error: "User or password incorrect" });
                }
            })).catch(err => {
                res.status(404).json({ Error: err.message });
            });
        }
    })).catch(err => {
        res.status(404).json({ Error: err.message });
    });
});
exports.logout = (req, res) => {
    verifyToken_1.DeleteToken(req, res);
};
exports.profile = (req, res) => {
    //console.log(req.header('Token'))
    res.send("Profile");
};
/*

import Encrypt from '../lib/encrypt';
console.dir(result.recordset)
config1.database = result.recordset[0].NombreBase;
console.log(config1)

 const x = await Encrypt.encryptPassword(user);
    const a = await Encrypt.encrypt(user);
    console.log(x)
    console.log(a)
    const token = jwt.sign({ user },process.env.TOKEN || 'TokenEskat')
    //res.header('Token', token ).json("Generado");
*/
/*const user = req.body.User;
   console.log(req.body.Pass)
   const pass = await Encrypt.encrypt(req.body.Pass);
   console.log(pass);
   const xx = await Encrypt.validate(pass, "$2a$10$TocPAsfif.BLnubiDeZZUutXoW7WDoIJx0TVXpvPdONCsKL3ZVBnu")
   console.log(xx)
   //$2a$10$yfSsrjZ11VSECLVWSUj.RukKiDcmi24O6056II0pbHNQ8upKxIkTC
   //$2a$10$TocPAsfif.BLnubiDeZZUutXoW7WDoIJx0TVXpvPdONCsKL3ZVBnu
   */ 
//# sourceMappingURL=login.controller.js.map