import Farm from '../models/farm';
import { Response, TypeResult } from '../helpers/response';

const farmController = {};

farmController.getAll = async (req, res) => {
	try {
		const farms = await Farm.find({});
		const isEmpty = farms.length == 0;

		res.status(200).json(
			new Response({
				type: isEmpty ? TypeResult.Warning : TypeResult.Success,
				isError: false,
				message: isEmpty ? `No existen registros` : 'Consulta exitosa',
				object: farms,
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

farmController.getById = async (req, res) => {
	try {
		const { id } = req.params;
		const farm = await Farm.findOne({ id });
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

farmController.createOne = async (req, res) => {
	try {
		const farm = new Farm(req.body);
		await farm.save();

		res.status(400).json(
			new Response({
				type: TypeResult.Success,
				isError: false,
				message: `Registro creado correctamente`,
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

farmController.update = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Farm.updateOne({ _id: id }, req.body);

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

farmController.deleteOne = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Farm.deleteOne({ _id: id });

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

farmController.getFarmsPerPage = async (req, res, next) => {
	const perPage = 2;
	const page = req.params.page || 1;

	try {
		await Farm.find({})
			.skip(perPage * page - perPage)
			.limit(perPage)
			.exec((err, farms) => {
				if (err) return next(err);
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

export default farmController;
