import { Response, TypeResult } from '../helpers/response';
import { registerUser, loginUser, logoutMe, logoutAll } from '../services/user.service';

const userCtrl = {};

userCtrl.register = async (req, res) => {
	registerUser(req.body)
		.then(result => {
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro creado correctamente`,
					object: result,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

userCtrl.login = async (req, res) => {
	loginUser(req.body)
		.then(result => {
			if (!result.user)
				return res.status(401).json(
					new Response({
						type: TypeResult.Danger,
						isError: true,
						message: 'Login Failed! Check authentication credentials',
					}),
				);

			return res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: 'Login Ok',
					object: result,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

userCtrl.logoutMe = async (req, res) => {
	try {
		await logoutMe(req);

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
		await logoutAll(req.user);

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
