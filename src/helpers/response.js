export const TypeResult = {
	Warning: 'Warning',
	Success: 'Success',
	Danger: 'Danger',
	Info: 'Info',
};

export class Response {
	constructor({ type = TypeResult.Info, isError = true, message = '', object = null }) {
		this.type = type;
		this.isError = isError;
		this.message = message;
		this.object = object;
	}
}
