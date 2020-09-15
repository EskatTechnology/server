"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const mensajes_1 = require("../controller/AppMensajeria/mensajes");
const router = express_1.Router();
router.get('/validarMensajes/:idUsuario', verifyToken_1.ValidarToken, new mensajes_1.Mensajes().validarMensajes);
exports.default = router;
//# sourceMappingURL=appMensajeria.js.map