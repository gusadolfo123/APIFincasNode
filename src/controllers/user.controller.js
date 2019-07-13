import User from '../models/user';

const userCtrl = {};

userCtrl.register = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();

		const token = await user.generateAuthToken();

		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
};

userCtrl.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);

		if (!user) return res.status(401).send({ error: 'Login Failed! Check authentication credentials' });

		const token = await user.generateAuthToken();

		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
};

userCtrl.logoutMe = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => token.token != req.token);

		await req.user.save();

		res.send(`logout ok`);
	} catch (error) {
		res.status(400).send(error);
	}
};

userCtrl.logoutAll = async (req, res) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length);

		await req.user.save();

		res.send(`logout ok`);
	} catch (error) {
		res.status(400).send(error);
	}
};

export default userCtrl;
