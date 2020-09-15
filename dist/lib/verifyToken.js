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
exports.DeleteToken = exports.ValidarToken = exports.CrearToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var randtoken = require('rand-token');
var refreshTokens = [];
exports.CrearToken = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'TokenEskat', { expiresIn: 60 });
    const refreshToken = randtoken.uid(12);
    refreshTokens[refreshToken] = id;
    const tok = {
        idUser: id,
        token: token,
        refreshToken: refreshToken
    };
    //console.log(refreshTokens)
    return tok;
});
exports.ValidarToken = (req, res, next) => {
    var userId = req.body.userId;
    var token = req.header('Token');
    var refreshToken = req.header('Refresh');
    console.log(userId, token, refreshToken);
    try {
        if (!token) {
            return res.status(205).json({ Error: "Access denied!" });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'TokenEskat');
        if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == userId)) {
            var newToken = jsonwebtoken_1.default.sign({ userId }, process.env.TOKEN || 'TokenEskat', { expiresIn: 60 });
            res.header('Token', newToken);
            next();
        }
    }
    catch (err) {
        console.log(err.message);
        if (err.message == 'jwt expired') {
            exports.DeleteToken(req, res);
            return res.status(205).json({ Error: "Access denied! Your waiting time has been exceeded." });
        }
        else {
            return res.status(205).json({ Error: "Error al procesar el token!" });
        }
    }
};
exports.DeleteToken = (req, res) => {
    var refreshToken = req.header('Refresh');
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken];
        res.json("OK");
    }
    console.log(refreshTokens);
};
/*
export const CrearToken = (req: Request, res: Response, next: NextFunction) => {
    var username = req.body.username
    var password = req.body.password
    var user = {
      'username': username,
      'role': 'admin'
    }
    var token = jwt.sign(user, process.env.TOKEN || 'TokenEskat', { expiresIn: 300 })
    var refreshToken = randtoken.uid(256)
    refreshTokens[refreshToken] = username
    res.json({token: 'JWT ' + token, refreshToken: refreshToken})
};

export const ValidarToken = (req: Request, res: Response, next: NextFunction) => {
    var username = req.body.username
    var refreshToken = req.body.refreshToken
    if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
      var user = {
        'username': username,
        'role': 'admin'
      }
      var token = jwt.sign(user, process.env.TOKEN || 'TokenEskat', { expiresIn: 300 })
      res.json({token: 'JWT ' + token})
    }
    else {
      res.send(401)
    }
}

export const DeleteToken = (req: Request, res: Response, next: NextFunction) => {
    var refreshToken = req.body.refreshToken
    if(refreshToken in refreshTokens) {
      delete refreshTokens[refreshToken]
    }
};

/*

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    var token = req.header('Token');
    try{
        if(!token){
            return res.status(401).json({Error: "Access denied!"})
        }
        
        const payload = jwt.verify(token, process.env.TOKEN || 'TokenEskat') as IPayload;
        req.userId = payload._id;
        console.log(payload)
        next();
    } catch(err) {
        if(err.message == 'jwt expired'){
        res.status(401).json({Error: "Access denied! Your waiting time has been exceeded."})
        }
        else{
        res.status(401).json({Error: "Error al procesar el token!"})
        }
    }
}

app.post('/token', function (req, res, next) {
    var username = req.body.username
    var refreshToken = req.body.refreshToken
    if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
      var user = {
        'username': username,
        'role': 'admin'
      }
      var token = jwt.sign(user, SECRET, { expiresIn: 300 })
      res.json({token: 'JWT ' + token})
    }
    else {
      res.send(401)
    }
  })*/ 
//# sourceMappingURL=verifyToken.js.map