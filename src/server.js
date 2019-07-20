import express, { json, urlencoded, Router } from 'express';

// imports middlewares
import auth from './middlewares/auth';

const app = express();

//Config
app.set('port', process.env.PORT || 4565);

//Middlewares
app.use(urlencoded({ extended: false }));
app.use(json()); // para capturar datos que se envian en el cuerpo de un request

//Routes
require('./routes/main.routes')(app, Router());
//app.use('/api', require('./routes/index.routes')(Router()));
// app.use('/api/users', MainRouter(Router()));
// app.use('/api/seasons', auth, SeasonRouter);
// app.use('/api/services', auth, ServiceRouter);
// app.use('/api/farms', auth, FarmRoutes);
// app.use('/api/companies', auth, CompanyRouter);
// app.use('/api/generate-mock-data', MockDataRouter);

export default app;
