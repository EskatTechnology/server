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
exports.Empresa = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../lib/database");
const verifyToken_1 = require("../../lib/verifyToken");
class Empresa {
    constructor() {
        this.loginEmpresa = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield new mssql_1.default.ConnectionPool(database_1.config).connect().then(pool => {
                return pool.request()
                    .input('Usuario', mssql_1.default.VarChar, req.body.User)
                    .input('Contraseña', mssql_1.default.VarChar, req.body.Pass)
                    .execute('LoginEmpresa');
            }).then((result) => __awaiter(this, void 0, void 0, function* () {
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
                    }).then((result) => __awaiter(this, void 0, void 0, function* () {
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
        this.logout = (req, res) => {
            verifyToken_1.DeleteToken(req, res);
        };
    }
}
exports.Empresa = Empresa;
//# sourceMappingURL=empresa.js.map