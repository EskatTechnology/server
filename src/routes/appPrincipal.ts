import { Router } from 'express';
import { ValidarToken } from '../lib/verifyToken'
import { Empresa } from '../controller/AppPrincipal/empresa';
import { Persona } from '../controller/AppPrincipal/persona';
import multer from '../lib/multer';

const router: Router = Router();

//Login
router.post('/login', new Empresa().loginEmpresa);
router.post('/logout', new Empresa().logout);

//Guardar persona
router.post('/savePerson', new Empresa().guardarPersona);
router.post('/createPerson', multer.single('image'), new Persona().crearPersona);

export default router;