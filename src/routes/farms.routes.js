import { Router } from 'express';
import { connect } from '../database';
import { Farm } from '../models/farm';
const router = Router();

// index
router.get('/', async (req, res) => {
	const db = await connect();
	const result = await db
		.collection('farms')
		.find({})
		.toArray();
	res.json(result);
});

// create
router.post('/', async (req, res) => {
	try {
		const { name, alias, dir, description, coordinate, images, prices, services, terms_conditions } = req.body;
		const db = await connect();

		let farm = new Farm({
			name,
			alias,
			dir,
			description,
			coordinate,
			images,
			prices,
			services,
			terms_conditions,
		});

		await db.collection('farms').insertOne(farm);
		res.json(farm);
	} catch (error) {
		res.json(error);
	}
});

export default router;
