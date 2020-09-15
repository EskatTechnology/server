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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../lib/database");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*const user = req.body.User;
    console.log(req.body.Pass)
    const pass = await Encrypt.encrypt(req.body.Pass);
    console.log(pass);
    const xx = await Encrypt.validate(pass, "$2a$10$TocPAsfif.BLnubiDeZZUutXoW7WDoIJx0TVXpvPdONCsKL3ZVBnu")
    console.log(xx)
    //$2a$10$yfSsrjZ11VSECLVWSUj.RukKiDcmi24O6056II0pbHNQ8upKxIkTC
    //$2a$10$TocPAsfif.BLnubiDeZZUutXoW7WDoIJx0TVXpvPdONCsKL3ZVBnu
    */
    yield new mssql_1.default.ConnectionPool(database_1.config).connect().then(pool => {
        return pool.request()
            .input('Usuario', mssql_1.default.VarChar, req.body.User)
            .input('Contraseña', mssql_1.default.VarChar, req.body.Pass)
            .execute('LoginEmpresa');
    }).then(result => {
        if (result.recordset.length > 0) {
            const id = result.recordset[0].IdUsuario;
            const token = jsonwebtoken_1.default.sign({ id }, process.env.TOKEN || 'TokenEskat', { expiresIn: 60 * 60 * 24 });
            res.header('Token', token).json(result.recordset);
        }
        else {
            new mssql_1.default.ConnectionPool(database_1.config).connect().then(pool => {
                return pool.request()
                    .input('Usuario', mssql_1.default.VarChar, req.body.User)
                    .input('Contraseña', mssql_1.default.VarChar, req.body.Pass)
                    .execute('LoginPersona');
            }).then(result => {
                if (result.recordset.length > 0) {
                    const id = result.recordset[0].IdUsuario;
                    const token = jsonwebtoken_1.default.sign({ id }, process.env.TOKEN || 'TokenEskat', { expiresIn: 60 * 60 * 24 });
                    res.header('Token', token).json(result.recordset);
                }
                else {
                    res.status(404).json({ Error: "User or password incorrect" });
                }
            }).catch(err => {
                res.status(404).json({ Error: err.message });
            });
        }
    }).catch(err => {
        res.status(404).json({ Error: err.message });
    });
});
exports.logout = (req, res) => {
    res.send("Sing Up");
};
exports.profile = (req, res) => {
    //console.log(req.header('Token'))
    res.send("Profile");
};
/*

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
//# sourceMappingURL=auth.controller.js.map