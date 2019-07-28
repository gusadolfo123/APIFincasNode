import mongoose from 'mongoose';
import ImageSchema from './image';

const SeasonSchema = mongoose.Schema(
	{
		total: { type: mongoose.Types.Decimal128 },
		per_person: { type: mongoose.Types.Decimal128 },
	},
	{ _id: false },
);

const FarmSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		alias: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		dir: {
			type: String,
			trim: true,
			lowercase: true,
		},
		description: String,
		type: String,
		qualification: Number,
		city: String,
		coordinate: {
			lat: mongoose.Types.Decimal128,
			lon: mongoose.Types.Decimal128,
		},
		images: [ImageSchema],
		prices: {
			low_season: SeasonSchema,
			mid_season: SeasonSchema,
			high_season: SeasonSchema,
		},
		services: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Service',
			},
		],
		terms_conditions: [String],
	},
	{ versionKey: false },
);

const Farm = mongoose.model('Farm', FarmSchema);

export default Farm;
