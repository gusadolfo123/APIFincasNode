import Service from '../models/service';

export async function getAllService() {
	const services = await Service.find({});
	return services;
}

export async function getServiceById(id) {
	const service = await Service.findOne({ _id: id });
	return service;
}

export async function createService(data) {
	const service = new Service(data);
	await service.save();
	return service;
}

export async function updateService(id, data) {
	const result = await Service.updateOne({ _id: id }, data);
	return result;
}

export async function deleteService(id) {
	const result = Service.deleteOne({ _id: id });
	return result;
}
