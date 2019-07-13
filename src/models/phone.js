import mongoose from 'mongoose';

const PhoneSchema = mongoose.Schema({
	phone_type: String,
	number: String,
});

export default PhoneSchema;
