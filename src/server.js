import express, { json, urlencoded } from 'express';

// import middleware
import auth from './middlewares/auth';

// import routes
import FarmRoutes from './routes/farms.routes';
import ServiceRouter from './routes/services.routes';
import SeasonRouter from './routes/season.routes';
import UserRouter from './routes/user.routes';
import CompanyRouter from './routes/company.routes';
import MockDataRouter from './routes/mock-data.routes';

// import database connection
import './database';

const app = express();

//Config
app.set('port', process.env.PORT || 4565);

//Middlewares
app.use(urlencoded({ extended: false }));
app.use(json()); // para capturar datos que se envian en el cuerpo de un request

//Routes
app.use('/api/users', UserRouter);
app.use('/api/seasons', auth, SeasonRouter);
app.use('/api/services', auth, ServiceRouter);
app.use('/api/farms', auth, FarmRoutes);
app.use('/api/companies', auth, CompanyRouter);
app.use('/api/generate-mock-data', MockDataRouter);

export default app;
