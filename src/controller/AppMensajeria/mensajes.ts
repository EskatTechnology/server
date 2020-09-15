import { Request, Response } from 'express';
import mssql from 'mssql';
import { config, config1 } from '../../lib/database';

export class Mensajes {

    validarMensajes = async (req: Request, res: Response) => {  
        //config1.database = req.header('Base') as string;
        console.log(req + "aaaaaaaa") 
        /*await new mssql.ConnectionPool(config1).connect().then(pool => {
            return pool.request()
            .input('idUsuario', mssql.Int, req.params)
            .execute('ValidarMensajes')
        }).then(async result => {
            if(result.recordset.length > 0 ){
                const data = result.recordset;
                res.status(200).json(data);
            }           
        }).catch(err => {
                res.status(404).json({Error: err.message});
        })  */ 
    };

}