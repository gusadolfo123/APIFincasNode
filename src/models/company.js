// export class Company {
// 	constructor({ name, dir, coordinate, phones, whatsapp, images, mission, vision, description }) {
// 		this.name = name;
// 		this.dir = dir;
// 		this.coordinate = coordinate;
// 		this.phones = phones;
// 		this.whatsapp = whatsapp;
// 		this.images = images;
// 		this.mission = mission;
// 		this.vision = vision;
// 		this.description = description;
// 	}
// }

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
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;
