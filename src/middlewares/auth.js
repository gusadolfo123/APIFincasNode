import jwt from 'jsonwebtoken';
import User from '../models/user';
import { isNullOrUndefined } from 'util';

const auth = async (req, res, next) => {
	try {
		if (isNullOrUndefined(req.header('Authorization'))) {
			res.status(401).json({ error: `Not authorized to access` });
		} else {
			const token = req.header('Authorization').replace('Bearer ', '');
			const data = jwt.verify(token, process.env.JWT_KEY);

			const user = await User.findOne({ _id: data._id, 'tokens.token': token });

			if (!user) throw new Error(`User not found`);
			req.user = user;
			req.token = token;

			next();
		}
	} catch (error) {
		res.status(401).json({ error: `Not authorized to access this resource` });
	}
};

export default auth;
