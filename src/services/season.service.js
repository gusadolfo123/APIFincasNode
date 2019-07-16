import Season from '../models/seasons';

export async function getAllSeasons() {
	const Seasons = await Season.find({});
	return Seasons;
}

export async function createSeason(data) {
	const Season = new Season(data);
	await Season.save();
	return Season;
}

export async function updateSeason(id, data) {
	const result = await Season.updateOne({ _id: id }, data);
	return result;
}
