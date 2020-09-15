import { Request, Response, response } from 'express';
import mssql from 'mssql';
import { config } from '../lib/database';
import { CrearToken, DeleteToken } from '../lib/verifyToken'

export const login = async (req: Request, res: Response) => {   
    await new mssql.ConnectionPool(config).connect().then(pool => {
        return pool.request()
        .input('Usuario', mssql.VarChar, req.body.User)
        .input('Contraseña', mssql.VarChar, req.body.Pass)
        .execute('LoginEmpresa')
    }).then(async result => {
        if(result.recordset.length > 0 ){
            const data = result.recordset;
            const id = '0';
            const token = await CrearToken(id, req);
            res.status(200).header({'Token': token.token, 'Refresh': token.refreshToken}).json(data);
        }
        else{
            new mssql.ConnectionPool(config).connect().then(pool => {
                return pool.request()
                .input('Usuario', mssql.VarChar, req.body.User)
                .input('Contraseña', mssql.VarChar, req.body.Pass)
                .execute('LoginPersona')
            }).then(async result => {
                if(result.recordset.length > 0 ){
                    const data = result.recordset;
                    const id = result.recordset[0].IdUsuario;
                    const token = await CrearToken(id, req);
                    res.status(200).header({'Token': token.token, 'Refresh': token.refreshToken}).json(data);
                }
                else{
                    res.status(205).json({Error: "User or password incorrect"});
                }        
            }).catch(err => {
                    res.status(404).json({Error: err.message});
            })  
        }        
    }).catch(err => {
            res.status(404).json({Error: err.message});
    })   
};

export const logout = (req: Request, res: Response) => {
    DeleteToken(req, res);    
};

export const profile = (req: Request, res: Response) => {
    //console.log(req.header('Token'))
    res.send("Profile"); 
};

/*

import Encrypt from '../lib/encrypt';
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
 /*const user = req.body.User;
    console.log(req.body.Pass)
    const pass = await Encrypt.encrypt(req.body.Pass);
    console.log(pass);
    const xx = await Encrypt.validate(pass, "$2a$10$TocPAsfif.BLnubiDeZZUutXoW7WDoIJx0TVXpvPdONCsKL3ZVBnu")
    console.log(xx)
    //$2a$10$yfSsrjZ11VSECLVWSUj.RukKiDcmi24O6056II0pbHNQ8upKxIkTC
    //$2a$10$TocPAsfif.BLnubiDeZZUutXoW7WDoIJx0TVXpvPdONCsKL3ZVBnu
    */