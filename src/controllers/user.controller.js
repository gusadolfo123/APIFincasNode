import User from '../models/user';
import { Response, TypeResult } from '../helpers/response';

const userCtrl = {};

userCtrl.register = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();

		const token = await user.generateAuthToken();

		res.status(200).json(
			new Response({
				type: TypeResult.Success,
				isError: false,
				message: `Registro creado correctamente`,
				object: { user, token },
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

userCtrl.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);

		if (!user) return res.status(401).send({ error: 'Login Failed! Check authentication credentials' });

		const token = await user.generateAuthToken();

		res.status(200).json(
			new Response({
				type: TypeResult.Success,
				isError: false,
				message: `Registro creado correctamente`,
				object: { user, token },
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

userCtrl.logoutMe = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
		await req.user.save();

		res.status(200).json(
			new Response({
				type: TypeResult.Success,
				isError: false,
				message: `Logout Ok`,
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

userCtrl.logoutAll = async (req, res) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length);
		await req.user.save();

		res.status(200).json(
			new Response({
				type: TypeResult.Success,
				isError: false,
				message: `Logout Ok`,
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

export default userCtrl;
