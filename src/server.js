import express, { json, urlencoded, Router } from 'express';
import MapRoutes from './routes/main.routes';
import morgan from 'morgan';
import cors from 'cors';
import logger from '../winston';
import compression from 'compression';
import helmet from 'helmet';
import errorHandler from './middlewares/error.handler';

// const app = express();

// //Config
// app.set('port', process.env.PORT || 4565);

// // error handler
// app.use(function(err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });

// //Middlewares
// app.use(urlencoded({ extended: false }));
// app.use(json()); // para capturar datos que se envian en el cuerpo de un request
// app.use(morgan('combined', { stream: logger.stream }));
// app.use(cors());
// app.use(compression());
// app.use(helmet());

// //Map Routes
// MapRoutes(app, Router());

// export default app;

class Server {
	constructor() {
		this.app = express();
		this.Configs();
		this.Middlewares();
		this.Routes();
	}

	Middlewares() {
		this.app.use(errorHandler);
		this.app.use(urlencoded({ extended: false }));
		this.app.use(json()); // para capturar datos que se envian en el cuerpo de un request
		this.app.use(morgan('combined', { stream: logger.stream }));
		this.app.use(cors());
		this.app.use(compression());
		this.app.use(helmet());
	}

	Configs() {
		this.app.set('port', process.env.PORT || 4565);
	}

	Routes() {
		MapRoutes(this.app, Router());
	}
}

export const app = new Server().app;
