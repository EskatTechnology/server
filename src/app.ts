import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors'
import loginRoutes from './routes/login';
import appPrincipalRoutes from './routes/appPrincipal'
import appMensajeria from './routes/appMensajeria'

const app: Application = express();

//Setting
app.set('port', 3000);

//Middewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(function(req,res,next){
    //res.setHeader('Access-Control-Allow-Origin','*');
    //res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, application/json');
    res.header('Access-Control-Expose-Headers','token , refresh');
    //res.header('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
    next();
});

//Routes
app.use('/api', appPrincipalRoutes);
app.use('/api', appMensajeria);

export default app;