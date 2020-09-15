"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controller/login.controller");
const verifyToken_1 = require("../lib/verifyToken");
const router = express_1.Router();
router.post('/login', login_controller_1.login);
router.post('/logout', login_controller_1.logout);
router.get('/profile', verifyToken_1.ValidarToken, login_controller_1.profile);
exports.default = router;
//# sourceMappingURL=login.js.map