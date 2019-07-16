import User from '../models/user';

export async function registerUser(data) {
	const user = new User(req.body);
	await user.save();
	const token = await user.generateAuthToken();

	const userResult = Object.assign({}, user);
	delete userResult['password'];

	return {
		userResult,
		token,
	};
}

export async function loginUser(data) {
	let token = null;
	const { email, password } = data;
	const user = await User.findByCredentials(email, password);

	if (user) token = await user.generateAuthToken();

	return { user, token };
}

export async function logoutMe(user) {
	user.tokens = user.tokens.filter(token => token.token != req.token);
	await user.save();
}

export async function logoutAll(user) {
	user.tokens.splice(0, user.tokens.length);
	await user.save();
}
