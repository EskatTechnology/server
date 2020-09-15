import { Token } from '../lib/verifyToken'
declare namespace Express {
    export interface Request {
        token: Token;
    }
}