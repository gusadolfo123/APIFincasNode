import express, { json, urlencoded, Router } from 'express';
import MapRoutes from './routes/main.routes';

const app = express();

//Config
app.set('port', process.env.PORT || 4565);

//Middlewares
app.use(urlencoded({ extended: false }));
app.use(json()); // para capturar datos que se envian en el cuerpo de un request

//Map Routes
MapRoutes(app, Router());

export default app;
