import { Router } from 'express';
import { connect } from '../database';
import { Service } from '../models/service';

const router = Router();

// getAll
router.get('/', async (req, res) => {
	const db = await connect();
	const services = await db
		.collection('services')
		.find({})
		.toArray();
	res.json(services);
});

// create
router.post('/', async (req, res) => {
	try {
		const db = await connect();
		let service = new Service(req.body);
		await db.collection('services').insertOne(service);
		res.json(service);
	} catch (error) {
		throw new Error(`Error en metodo create ${error}`);
	}
});

export default router;
