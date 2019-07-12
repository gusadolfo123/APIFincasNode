import jwt from 'jsonwebtoken';
import User from '../models/user';
import { isNullOrUndefined } from 'util';
import { connect, disconnect } from '../database';

const auth = async (req, res, next) => {
	try {
		if (isNullOrUndefined(req.header('Authorization'))) {
			res.status(401).send({ error: `Not authorized to access this resource 1` });
		} else {
			const token = req.header('Authorization').replace('Bearer ', '');
			const data = jwt.verify(token, process.env.JWT_KEY);
			await connect();
			const user = await User.findOne({ _id: data._id, 'tokens.token': token });
			await disconnect();

			if (!user) throw new Error(`User not found`);
			req.user = user;
			req.token = token;
			next();
		}
	} catch (error) {
		res.status(401).send({ error: `Not authorized to access this resource 2 ${error}` });
	}
};

module.exports = auth;
