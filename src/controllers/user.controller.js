import User from '../models/user';
import { connect, disconnect } from '../database';

const userController = {};

// V1. Con libreria de Mongodb sin auth
// userController.createUser = async (req, res) => {
// 	const db = await connect();
// 	let user = new User(req.body);
// 	await db.collection('users').insertOne(user);
// 	res.status(201).json(user);
// };

// userController.getAll = async (req, res) => {
// 	const db = await connect();
// 	const users = await db
// 		.collection('users')
// 		.find({})
// 		.toArray();
// 	res.json(users);
// };

// userController.getById = async (req, res) => {
// 	const db = await connect();
// 	const { id } = req.params;
// 	const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
// 	res.status(200).json(user);
// };

// userController.update = async (req, res) => {
// 	const db = await connect();
// 	const { id } = req.params;
// 	let user = new User(req.body);
// 	await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: user });
// 	res.json(user);
// };

// // userController.delete pendiente

// V2. Con libreria de Mongoose con auth
userController.register = async (req, res) => {
	try {
		await connect();

		const user = new User(req.body);
		await user.save();

		const token = await user.generateAuthToken();

		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	} finally {
		await disconnect();
	}
};

userController.login = async (req, res) => {
	try {
		await connect();
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);

		if (!user) return res.status(401).send({ error: 'Login Failed! Check authentication credentials' });

		const token = await user.generateAuthToken();

		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	} finally {
		await disconnect();
	}
};

userController.logoutMe = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => token.token != req.token);

		await connect();
		await req.user.save();

		res.send(`logout ok`);
	} catch (error) {
		res.status(400).send(error);
	} finally {
		await disconnect();
	}
};

userController.logoutAll = async (req, res) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length);

		await connect();
		await req.user.save();

		res.send(`logout ok`);
	} catch (error) {
		res.status(400).send(error);
	} finally {
		await disconnect();
	}
};

export default userController;
