import express, { json, urlencoded, Router } from 'express';
import MapRoutes from './routes/main.routes';
import morgan from 'morgan';
import cors from 'cors';
import logger from '../winston';
import compression from 'compression';
import helmet from 'helmet';
import errorHandler from './middlewares/error.handler';

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
