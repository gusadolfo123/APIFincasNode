import express, { json } from 'express';
import IndexRoutes from './routes/index.routes';
import FarmRoutes from './routes/farms.routes';
import ServiceRouter from './routes/services.routes';

const app = express();

//Config
app.set('port', process.env.PORT || 4565);

//Middlewares
app.use(express.json()); // para capturar datos que se envian en el cuerpo de un request

//Routes
app.use(IndexRoutes);
app.use('/farms', FarmRoutes);
app.use('/services', ServiceRouter);

export default app;
