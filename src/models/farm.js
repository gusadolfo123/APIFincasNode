import mongoose from "mongoose";

const FarmSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	alias: {
		type: String,
		trim: true,
		required: true
	},
	dir: String,
	description: String,
	coordinate: {
		type: {
			lat: mongoose.Types.Decimal128,
			lon: mongoose.Types.Decimal128
		}
	},
	images: [{
		name: String,
		url: String,
		size: mongoose.Types.Decimal128
	}],
	prices: {
		low_season: {
			total: mongoose.Types.Decimal128,
			per_person: mongoose.Types.Decimal128
		},
		mid_season: {
			total: mongoose.Types.Decimal128,
			per_person: mongoose.Types.Decimal128
		},
		high_season: {
			total: mongoose.Types.Decimal128,
			per_person: mongoose.Types.Decimal128
		},
	},
	services: [String],
	terms_conditions: [String]
});

const Farm = mongoose.model('Farm', FarmSchema);

export default Farm;