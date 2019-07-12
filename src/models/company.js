import mongoose from 'mongoose';

const CompanySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	dir: {
		type: String,
		required: true,
		trim: true,
	},
	coordinate: {
		type: {
			lat: mongoose.Types.Decimal128,
			lon: mongoose.Types.Decimal128
		}
	},
	phones: [{
		phone_type: String,
		number: String
	}],
	whatsapp: String,
	images: [{
		name: String,
		url: String,
		size: mongoose.Types.Decimal128
	}],
	mission: {
		type: String
	},
	vision: {
		type: String
	},
	description: {
		type: String
	}
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;
