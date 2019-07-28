import City from '../models/city';

export async function getAllCities() {
	const cities = await City.find({});
	return cities;
}

export async function addCity(data) {
	const city = new City(data);
	await city.save();
	return city;
}

export async function deleteCity(id) {
	const result = await City.deleteOne({ _id: id });
	return result;
}
