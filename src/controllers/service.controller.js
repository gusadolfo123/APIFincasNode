import Service from '../models/service';

const serviceController = {};

serviceController.createOne = async (req, res) => {
	try {
		const service = new Service(req.body);
		res.status(201).send({ service });
	} catch (error) {
		res.status(400).send({ error: `Error al intentar crear un servicio: ${error}` });
	}
};

serviceController.getAll = async (req, res) => {
	try {
		const services = await Service.find({}).exec();
		res.status(200).send({ services });
	} catch (error) {
		res.status(400).send({ error });
	}
};

serviceController.getById = async (req, res) => {
	try {
		const { id } = req.params;
		const services = await Service.find({ id }).exec();
		res.status(200).send({ services });
	} catch (error) {
		res.status(400).send({ error });
	}
};

serviceController.update = async (req, res) => {
	try {
		const { id } = req.params;
		const service = await Service.findByIdAndUpdate(id, { $set: req.body });
		res.status(200).send({ service });
	} catch (error) {
		res.status(400).send({ error });
	}
};

serviceController.deleteOne = async (req, res) => {
	try {
		const { id } = req.params;
		await Service.deleteOne({ _id: id });
		res.status(200).send(`Servicio eliminado correctamente`);
	} catch (error) {
		res.status(400).send(`Error al intentar eliminar un servicio. ${error}`);
	}
};

export default serviceController;
