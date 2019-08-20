import { getAllFarms, getFarmById, getFarmsPerPage, deleteFarm, updateFarm, createFarm } from '../services/farm.service';
import { Response, TypeResult } from '../helpers/response';
import { isNullOrUndefined } from 'util';

const farmController = {};

farmController.getAll = async (req, res) => {
	const farmsPage = parseInt(req.query.farmsPage) || 3;
	const currentPage = parseInt(req.query.currentPage) || 1;

	getAllFarms(farmsPage, currentPage)
		.then(result => {
			const isEmpty = result.total == 0 ? true : false;

			res.status(200).json(
				new Response({
					type: isEmpty ? TypeResult.Warning : TypeResult.Success,
					isError: false,
					message: isEmpty ? `No existen registros` : 'Consulta exitosa',
					object: result,
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

farmController.getById = async (req, res) => {
	const { id } = req.params;

	getFarmById(id)
		.then(farm => {
			const isEmpty = isNullOrUndefined(farm);
			res.status(200).json(
				new Response({
					type: isEmpty ? TypeResult.Warning : TypeResult.Success,
					isError: false,
					message: isEmpty ? `No existen registros` : 'Consulta exitosa',
					object: farm,
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

farmController.createOne = async (req, res) => {
	createFarm(req.body)
		.then(farm => {
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro creado correctamente`,
					object: farm,
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

farmController.update = async (req, res) => {
	const { id } = req.params;

	updateFarm(id, req.body)
		.then(result => {
			if (result.nModified > 0)
				res.status(200).json(
					new Response({
						type: TypeResult.Success,
						isError: false,
						message: `Registro modificado correctamente`,
					}),
				);
			else
				res.status(400).json(
					new Response({
						type: TypeResult.Info,
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

farmController.deleteOne = async (req, res) => {
	const { id } = req.params;

	deleteFarm(id)
		.then(result => {
			if (result.deletedCount > 0)
				res.status(200).json(
					new Response({
						type: TypeResult.Success,
						isError: false,
						message: `Registro eliminado correctamente`,
					}),
				);
			else
				res.status(400).json(
					new Response({
						type: TypeResult.Info,
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

farmController.getFarmsPerPage = async (req, res, next) => {
	const page = req.params.page || 1;

	getFarmsPerPage(page)
		.then(result => {
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					object: result,
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

export default farmController;
