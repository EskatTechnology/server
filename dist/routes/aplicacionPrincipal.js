"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_1 = require("../controller/AplicacionPrincipal/empresa");
const router = express_1.Router();
//Login
router.post('/login', new empresa_1.Empresa().login);
router.post('/logout', new empresa_1.Empresa().logout);
exports.default = router;
//# sourceMappingURL=aplicacionPrincipal.js.map