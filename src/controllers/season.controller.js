import Season from '../models/seasons';
import { Response, TypeResult } from '../helpers/response';

const seasonController = {};

seasonController.getAll = async (req, res) => {
	try {
		const seasons = await Season.find({});
		const isEmpty = seasons.length == 0;

		res.status(200).json(
			new Response({
				type: isEmpty ? TypeResult.Warning : TypeResult.Success,
				isError: false,
				message: isEmpty ? `No existen registros` : 'Consulta exitosa',
				object: seasons,
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

seasonController.createSeason = async (req, res) => {
	try {
		const season = new Season(req.body);
		await season.save();

		res.status(200).json(
			new Response({
				type: TypeResult.Success,
				isError: false,
				message: `Registro creado correctamente`,
				object: season,
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

seasonController.updateSeason = async (req, res) => {
	try {
		const result = Season.updateOne({ _id: id }, req.body);

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

export default seasonController;
