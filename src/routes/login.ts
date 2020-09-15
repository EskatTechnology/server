import { Router } from 'express';
import { login, logout, profile } from '../controller/login.controller';
import { ValidarToken } from '../lib/verifyToken'
const router: Router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', ValidarToken, profile);

export default router;