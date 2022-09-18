const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vaccineSchema = new Schema(
	{
		userId: { type: String, required: true },
		name: { type: String, required: true },
		children: { type: String, required: true },
		doses: { type: Number, required: true },
		dateofApplication: { type: Date, required: true },
		placeofApplication: { type: String, required: true },
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

const Vaccine = mongoose.model('vaccine', vaccineSchema);
module.exports = Vaccine;
