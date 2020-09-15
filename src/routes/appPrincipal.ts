import { Router } from 'express';
import { ValidarToken } from '../lib/verifyToken'
import { Empresa } from '../controller/AppPrincipal/empresa';
const router: Router = Router();

//Login
router.post('/login', new Empresa().loginEmpresa);
router.post('/logout', new Empresa().logout);

export default router;