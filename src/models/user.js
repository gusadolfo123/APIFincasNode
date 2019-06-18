export class User {
	constructor({ firstName, lastName, birthDate, email, phones = [] }) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.email = email;
		this.phones = phones;
	}
}
