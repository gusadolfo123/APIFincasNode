import Farm from '../models/farm';

export async function getAllFarms() {
	const farms = await Farm.find({});
	return farms;
}

export async function getFarmById(id) {
	const farm = await Farm.findOne({ _id: id });
	return farm;
}

export async function createFarm(data) {
	const farm = new Farm(data);
	await farm.save();
	return farm;
}

export async function updateFarm(id, data) {
	const result = await Farm.updateOne({ _id: id }, data);
	return result;
}

export async function deleteFarm(id) {
	const result = await Farm.deleteOne({ _id: id });
	return result;
}

export async function getFarmsPerPage(page) {
	const perPage = 2;
	const count = await Farm.countDocuments();
	const farms = await Farm.find({})
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec();

	return {
		farms,
		current: page,
		pages: Math.ceil(count / perPage),
		total: count,
	};
}
