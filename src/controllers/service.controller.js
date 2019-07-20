import { getAllService, getServiceById, createService, updateService, deleteService } from '../services/service.service';
import { Response, TypeResult } from '../helpers/response';
import { isNullOrUndefined } from 'util';

const serviceController = {};

serviceController.createOne = async (req, res) => {
	createService()
		.then(service => {
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro creado correctamente`,
					object: service,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

serviceController.getAll = async (req, res) => {
	getAllService()
		.then(services => {
			const isEmpty = services.length == 0;

			res.status(200).json(
				new Response({
					type: isEmpty ? TypeResult.Warning : TypeResult.Success,
					isError: false,
					message: isEmpty ? `No existen registros` : 'Consulta exitosa',
					object: services,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

serviceController.getById = async (req, res) => {
	const { id } = req.params;

	getServiceById(id)
		.then(service => {
			const isEmpty = isNullOrUndefined(service);

			res.status(200).json(
				new Response({
					type: isEmpty ? TypeResult.Warning : TypeResult.Success,
					isError: false,
					message: isEmpty ? `No existen registros` : 'Consulta exitosa',
					object: service,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

serviceController.update = async (req, res) => {
	const { id } = req.params;

	updateService(id, req.body)
		.then(result => {
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
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

serviceController.deleteOne = async (req, res) => {
	const { id } = req.params;
	deleteService(id)
		.then(result => {
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
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

export default serviceController;
