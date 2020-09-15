"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const appPrincipal_1 = __importDefault(require("./routes/appPrincipal"));
const appMensajeria_1 = __importDefault(require("./routes/appMensajeria"));
const app = express_1.default();
//Setting
app.set('port', 3000);
//Middewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(function (req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin','*');
    //res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, application/json');
    res.header('Access-Control-Expose-Headers', 'token , refresh');
    //res.header('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
    next();
});
//Routes
app.use('/api', appPrincipal_1.default);
app.use('/api', appMensajeria_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map