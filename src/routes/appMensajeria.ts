import { Router } from 'express';
import { ValidarToken } from '../lib/verifyToken'
import { Mensajes } from '../controller/AppMensajeria/mensajes';

const router: Router = Router();

router.get('/validarMensajes/:idUsuario', ValidarToken, new Mensajes().validarMensajes );

export default router;