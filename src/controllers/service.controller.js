import { connect } from '../database';
import { Service } from '../models/service';
import { ObjectId } from 'mongodb';

const serviceController = {};

serviceController.getAll = async (req, res) => {
	const db = await connect();
	const services = await db
		.collection('services')
		.find({})
		.toArray();
	res.status(200).json(services);
};

serviceController.update = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	let service = new Service(req.body);
	const document = await db.collection('services').updateOne({ _id: new ObjectId(id) }, { $set: service });

	if (document.result.n === 0) res.status(200).json(`Servicio no existente`);
	else res.status(200).json(`Servicio Modificado correctamente`);
};

serviceController.createOne = async (req, res) => {
	try {
		const db = await connect();
		let service = new Service(req.body);
		await db.collection('services').insertOne(service);
		res.status(201).json(service);
	} catch (error) {
		res.status(500).json(`Error al intentar crear un servicio: ${error}`);
		throw new Error(`Error al intentar crear un servicio createOne: ${error}`);
	}
};

serviceController.deleteOne = async (req, res) => {
	try {
		const db = await connect();
		const { id } = req.params;
		const document = await db.collection('services').deleteOne({ _id: new ObjectId(id) });

		if (document.result.n === 0) res.status(200).json(`Servicio no existente`);
		else res.status(200).json(`Servicio eliminado correctamente`);
	} catch (error) {
		res.status(500).json(`Error al intentar eliminar un servicio. ${error}`);
		throw new Error(`Error al intentar eliminar un servicio. ${error}`);
	}
};

serviceController.getServicesPerPage = async (req, res, next) => {
	const perPage = 9;
	const page = req.params.page || 1;
	const db = await connect();

	await db
		.collection('services')
		.find({})
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec((err, services) => {
			Farm.countDocuments((err, count) => {
				if (err) return next(err);
				res.status(200).json({
					services,
					current: page,
					pages: Math.ceil(count / perPage),
					total: count,
				});
			});
		});
};

export default serviceController;
