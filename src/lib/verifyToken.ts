import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';
var randtoken = require('rand-token')

interface IPayload {
    _id: string;
    lat: number;
    exp: number;
}

export interface Token {
    idUser: string,
    token: string;
    refreshToken: string;
}

var refreshTokens: any[] = []; 

export const CrearToken = async (id: string, req: Request): Promise<Token> => {  
    const token = await jwt.sign({ id }, process.env.JWT_SECRET || 'TokenEskat', { expiresIn : 60 });
    const refreshToken = randtoken.uid(12); 
    refreshTokens[refreshToken] = id;   
    const tok: Token ={
        idUser: id,
        token: token,
        refreshToken: refreshToken
    }
    //console.log(refreshTokens)
    return tok; 
};

export const ValidarToken = (req: Request, res: Response, next: NextFunction) => {
    var userId = req.body.userId;
    var token = req.header('Token') as any
    
    var refreshToken = req.header('Refresh') as any
    console.log(userId, token, refreshToken)
    try{
        if(!token){
            return res.status(205).json({Error: "Access denied!"})
        }
        jwt.verify(token, process.env.JWT_SECRET || 'TokenEskat');

        if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == userId)) {
            var newToken = jwt.sign({ userId }, process.env.TOKEN || 'TokenEskat', { expiresIn: 60 });
            res.header('Token', newToken);  
            next();           
        }               
    } catch(err) {
        console.log(err.message)
        if(err.message == 'jwt expired'){
            DeleteToken(req, res);
            return res.status(205).json({Error: "Access denied! Your waiting time has been exceeded."});
        }
        else{
            return res.status(205).json({Error: "Error al procesar el token!"})
        }
    }    
}

export const DeleteToken = (req: Request, res: Response) => {
    var refreshToken =  req.header('Refresh') as any
    if(refreshToken in refreshTokens) { 
      delete refreshTokens[refreshToken]  
      res.json("OK");     
    } 
    console.log(refreshTokens)
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