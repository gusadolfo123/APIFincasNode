import Season from '../models/seasons';
import { Response, TypeResult } from '../helpers/response';

const seasonController = {};

seasonController.getAll = async (req, res) => {
	try {
		const seasons = await Season.find({});
		const isEmpty = farms.length == 0;

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
	const db = await connect();
	let season = new Seasons(req.body);
	await db.collection('seasons').insertOne(season);
	res.status(201).json(season);
};

seasonController.updateSeason = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	let season = new Seasons(req.body);
	const seasons = await db.collection('seasons').updateOne({ _id: new ObjectId(id) }, { $set: season });
	res.status(200).json(`Grabacion correcta`);
};

export default seasonController;
