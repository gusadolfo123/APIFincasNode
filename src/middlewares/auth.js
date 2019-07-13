import jwt from 'jsonwebtoken';
import User from '../models/user';
import { isNullOrUndefined } from 'util';
import { connect, disconnect } from '../database';

const auth = async (req, res, next) => {
	try {
		if (isNullOrUndefined(req.header('Authorization'))) {
			res.status(401).send({ error: `Not authorized to access` });
		} else {
			const token = req.header('Authorization').replace('Bearer ', '');
			const data = jwt.verify(token, process.env.JWT_KEY);

			console.log('1. auth');
			await connect();
			console.log('2. auth');
			const user = await User.findOne({ _id: data._id, 'tokens.token': token });
			console.log('3. auth');
			await disconnect();
			console.log('4. auth');

			if (!user) throw new Error(`User not found`);
			req.user = user;
			req.token = token;
			console.log(1);
			next();
			console.log(2);
		}
	} catch (error) {
		res.status(401).send({ error: `Not authorized to access this resource 2 ${error}` });
	} finally {
		console.log(3);
		await disconnect();
		console.log(4);
	}
};

module.exports = auth;
