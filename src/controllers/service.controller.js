import Service from '../models/service';
import { Response, TypeResult } from '../helpers/response';

const serviceController = {};

serviceController.createOne = async (req, res) => {
	try {
		const service = new Service(req.body);

		res.status(200).json(
			new Response({
				type: TypeResult.Success,
				isError: false,
				message: `Registro creado correctamente`,
				object: service,
			}),
		);
	} catch (error) {
		res.status(400).json(
			new Response({
				type: TypeResult.Danger,
				isError: true,
				message: error,
			}),
		);
	}
};

serviceController.getAll = async (req, res) => {
	try {
		const services = await Service.find({});
		const isEmpty = services.length == 0;

		res.status(200).json(
			new Response({
				type: isEmpty ? TypeResult.Warning : TypeResult.Success,
				isError: false,
				message: isEmpty ? `No existen registros` : 'Consulta exitosa',
				object: services,
			}),
		);
	} catch (error) {
		res.status(400).json(
			new Response({
				type: TypeResult.Danger,
				isError: true,
				message: error,
			}),
		);
	}
};

serviceController.getById = async (req, res) => {
	try {
		const { id } = req.params;
		const service = await Service.findOne({ id });
		const isEmpty = isNullOrUndefined(farm);

		res.status(200).json(
			new Response({
				type: isEmpty ? TypeResult.Warning : TypeResult.Success,
				isError: false,
				message: isEmpty ? `No existen registros` : 'Consulta exitosa',
				object: farm,
			}),
		);
	} catch (error) {
		res.status(400).json(
			new Response({
				type: TypeResult.Danger,
				isError: true,
				message: error,
			}),
		);
	}
};

serviceController.update = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Service.updateOne({ _id: id }, req.body);

		if (result.nModified > 0)
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro modificado correctamente`,
				}),
			);
		else {
			res.status(400).json(
				new Response({
					type: TypeResult.Info,
					isError: true,
					message: `Registro no encontrado`,
				}),
			);
		}
	} catch (error) {
		res.status(400).json(
			new Response({
				type: TypeResult.Danger,
				isError: true,
				message: error,
			}),
		);
	}
};

serviceController.deleteOne = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Service.deleteOne({ _id: id });

		if (result.deletedCount > 0)
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro eliminado correctamente`,
				}),
			);

		if (result.n == 0)
			res.status(200).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: `Registro no encontrado`,
				}),
			);
	} catch (error) {
		res.status(400).json(
			new Response({
				type: TypeResult.Danger,
				isError: true,
				message: error,
			}),
		);
	}
};

export default serviceController;
