import { connect } from '../database';
import { Season } from '../models/season';
import { ObjectId } from 'mongodb';

const seasonController = {};

seasonController.getAll = async (req, res) => {
	const db = await connect();
	const seasons = await db
		.collection('seasons')
		.find({})
		.toArray();
	res.status(200).json(seasons);
};

seasonController.createSeason = async (req, res) => {
	const db = await connect();
	let season = new Season(req.body);
	await db.collection('seasons').insertOne(season);
	res.status(201).json(season);
};

seasonController.updateSeason = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	let season = new Season(req.body);
	const seasons = await db.collection('seasons').updateOne({ _id: new ObjectId(id) }, { $set: season });
	res.status(200).json(`Grabacion correcta`);
};

export default seasonController;
