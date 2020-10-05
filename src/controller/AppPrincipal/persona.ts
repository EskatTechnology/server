import { Request, Response, response } from 'express';
import mssql, { pool } from 'mssql';
import { config } from '../../lib/database';
import { CrearToken, DeleteToken } from '../../lib/verifyToken'
import { environment } from '../../environments/envitoments';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: environment.cloud_name,
    api_key: environment.api_key,
    api_secret: environment.api_secret
})

export class Persona {
    
    crearPersona= async (req: Request, res: Response) => {

        //subida de imagen a cloudinary
        const result= await cloudinary.v2.uploader.upload(req.file.path);
        req.body.img_url=result.url; 

        await new mssql.ConnectionPool(config).connect().then(pool =>{
            return pool.request()
            .input('IdPersona', mssql.Int, req.body.personID)
            .input('Nombre', mssql.VarChar, req.body.name)
            .input('Apelldios', mssql.VarChar, req.body.lastname) //revisar el nombre de la variable, en visual studio aparecia apellidios
            .input('Usuario', mssql.VarChar, req.body.username)
            .input('Contraseña', mssql.VarChar, req.body.password)
            .input('Telefono', mssql.VarChar, req.body.phone)
            .input('Identificacion', mssql.VarChar, req.body.identification)
            .input('Administrativo', mssql.Int, req.body.cnAdminitrativo)
            .input('Parqueaderos', mssql.Int, req.body.parqueaderos)
            .input('Personal', mssql.Int, req.body.personal)
			.input('PersonalMovil', mssql.Int, req.body.personalMovil)
			.input('Vehicular', mssql.Int, req.body.vehicular)
			.input('VehicularMovil', mssql.Int, req.body.vehicularMovil)
			.input('Invntarios', mssql.Int, req.body.inventarios)
			.input('InventariosMovil', mssql.Int, req.body.inventriosMovil)
			.input('Residencial', mssql.Int, req.body.residencial)
			.input('Corporativo', mssql.Int, req.body.corporativo)
			.input('Cargo', mssql.Int, req.body.cargo)
			.input('TipoPago', mssql.Int, req.body.tipoPago)
			.input('Sueldo', mssql.Float, req.body.sueldo)
            .input('Extras', mssql.Int, req.body.extras)
            .input('urlFoto', mssql.VarChar, req.body.img_url) //espacio en el que se deberia guardar la url de clodinary
			//lista.Add(new Metodos { Nombre = "@Foto", tipo = SqlDbType.Image, valor = fotoUsuario });
            .execute('CrearPersona')
        })
        
    }
   
    
}