import { User } from '../models/user';
import { connect } from '../database';
import { ObjectId } from 'mongodb';

const userController = {};

userController.createUser = async (req, res) => {
	const db = await connect();
	let user = new User(req.body);
	await db.collection('users').insertOne(user);
	res.status(201).json(user);
};

userController.getAll = async (req, res) => {
	const db = await connect();
	const users = await db
		.collection('users')
		.find({})
		.toArray();
	res.json(users);
};

userController.getById = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
	res.status(200).json(user);
};

userController.update = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	let user = new User(req.body);
	await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: user });
	res.json(user);
};

// userController.delete pendiente

export default userController;
