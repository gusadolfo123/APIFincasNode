import mongoose from 'mongoose';
import ImageSchema from './image';
import PhoneSchema from './phone';

const CompanySchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		dir: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		coordinate: {
			lat: mongoose.Types.Decimal128,
			lon: mongoose.Types.Decimal128,
		},
		phones: [PhoneSchema],
		images: [ImageSchema],
		whatsapp: String,
		facebook: String,
		instagram: String,
		twitter: String,
		mission: String,
		vision: String,
		description: String,
	},
	{ versionKey: false },
);

const Company = mongoose.model('Company', CompanySchema);

export default Company;
