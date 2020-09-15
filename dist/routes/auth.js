"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const verifyToken_1 = require("../lib/verifyToken");
const router = express_1.Router();
router.post('/login', auth_controller_1.login);
router.post('/logout', auth_controller_1.logout);
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map