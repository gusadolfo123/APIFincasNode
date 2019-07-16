import User from '../models/user';

export async function registerUser(data) {
	const user = new User(data);
	await user.save();
	const token = await user.generateAuthToken();

	return {
		user,
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

export async function logoutMe({ user, token }) {
	user.tokens = user.tokens.filter(element => {
		return token != element.token;
	});
	await user.save();
}

export async function logoutAll(user) {
	user.tokens.splice(0, user.tokens.length);
	await user.save();
}
