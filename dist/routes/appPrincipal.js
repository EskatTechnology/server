"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_1 = require("../controller/AppPrincipal/empresa");
const router = express_1.Router();
//Login
router.post('/login', new empresa_1.Empresa().loginEmpresa);
router.post('/logout', new empresa_1.Empresa().logout);
exports.default = router;
//# sourceMappingURL=appPrincipal.js.map