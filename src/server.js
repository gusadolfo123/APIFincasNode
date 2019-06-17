import express, { json, urlencoded } from 'express';
import FarmRoutes from './routes/farms.routes';
import ServiceRouter from './routes/services.routes';

const app = express();

//Config
app.set('port', process.env.PORT || 4565);

//Middlewares
app.use(urlencoded({ extended: false }));
app.use(json()); // para capturar datos que se envian en el cuerpo de un request

//Routes
app.use('/api/farms', FarmRoutes);
app.use('/api/services', ServiceRouter);

export default app;
