import mongoose from 'mongoose';

const CitySchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
	},
	{ versionKey: false },
);

const City = mongoose.model('City', CitySchema);

export default City;
