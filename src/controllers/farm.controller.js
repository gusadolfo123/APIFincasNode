import Farm from '../models/farm';

const farmController = {};

farmController.getAll = async (req, res) => {
	try {
		const farms = await Farm.find({}).exec();
		res.status(200).send({ farms });
	} catch (error) {
		res.status(200).send({ error });
	}
};

farmController.getBy = async (req, res, next) => {
	const db = await connect();
	const { where, select } = req.body;
	const result = await db
		.collection('farms')
		.find(where, select)
		.toArray();
	res.status(200).json(result);
};

farmController.createOne = async (req, res) => {
	try {
		const db = await connect();
		let farm = new Farm(req.body);
		await db.collection('farms').insertOne(farm);
		res.json(farm);
	} catch (error) {
		res.json(error);
	}
};

farmController.update = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	const farm = new Farm(req.body);
	const document = await db.collection('farms').updateOne({ _id: new ObjectId(id) }, { $set: farm });

	if (document.result.n === 0) res.status(200).json(`Finca no existente`);
	else res.status(200).json(`Finca Modificada correctamente`);
};

farmController.deleteOne = async (req, res) => {
	const db = await connect();
	const { id } = body.params;
	const document = await db.collection('farms').deleteOne({ _id: new ObjectId(id) });

	if (document.result.n === 0) res.status(200).json(`Finca no existente`);
	else res.status(200).json(`Finca eliminado correctamente`);
};

farmController.getFarmsPerPage = async (req, res, next) => {
	const perPage = 9;
	const page = req.params.page || 1;
	const db = await connect();

	await db
		.collection('farms')
		.find({})
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec((err, farms) => {
			Farm.countDocuments((err, count) => {
				if (err) return next(err);
				res.status(200).json({
					farms,
					current: page,
					pages: Math.ceil(count / perPage),
					total: count,
				});
			});
		});
};

export default farmController;
