import mongoose from 'mongoose';

const ImageSchema = mongoose.Schema({
	name: { type: String },
	url: { type: String },
	size: { type: mongoose.Types.Decimal128 },
});

export default ImageSchema;
