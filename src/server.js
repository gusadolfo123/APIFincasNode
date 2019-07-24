import express, { json, urlencoded, Router } from 'express';
import MapRoutes from './routes/main.routes';
import morgan from 'morgan';
import cors from 'cors';
import logger from '../winston';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

//Config
app.set('port', process.env.PORT || 4565);

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

//Middlewares
app.use(urlencoded({ extended: false }));
app.use(json()); // para capturar datos que se envian en el cuerpo de un request
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(compression());
app.use(helmet());

//Map Routes
MapRoutes(app, Router());

export default app;
