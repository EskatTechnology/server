import { Request, Response, response } from 'express';
import mssql from 'mssql';
import { config } from '../../lib/database';
import { CrearToken, DeleteToken } from '../../lib/verifyToken'


export class Empresa {

    guardarPersona= async (req: Request, res: Response) => {
        await new mssql.ConnectionPool(config).connect().then(pool =>{
            return pool.request()
            .input('Nombre',mssql.VarChar, req.body.name)
            .input('Apellidos',mssql.VarChar, req.body.lastname)
            .input('Usuario',mssql.VarChar,req.body.user)
            .input('Contraseña',mssql.VarChar,req.body.password)
            .input('Telefono',mssql.VarChar,req.body.phone)
            .input('Identificacion',mssql.VarChar,req.body.identification)
            .input('IdEmpresa',mssql.Int,req.body.idCompany)
            .execute('CrearPersona')
        })        
    }

    loginEmpresa = async (req: Request, res: Response) => {   
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

    logout = (req: Request, res: Response) => {
        DeleteToken(req, res);    
    };

    
}