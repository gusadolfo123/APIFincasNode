import mongoose from "mongoose";

const SeasonSchema = mongoose.Schema({
	mid: [Date],
	hight: [Date]
});

const Season = mongoose.model('Season', SeasonSchema);

export default Season;