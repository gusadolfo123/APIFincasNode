import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
	name: String,
	description: String,
	icon: String
});

const Service = mongoose.model('Service', ServiceSchema);

export default Service;