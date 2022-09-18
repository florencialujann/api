const Joi = require('joi');
const Vaccine = require('./vaccine.model');
exports.Registervaccine = async (req, res) => {
	const vaccine = Joi.object().keys({
		name: Joi.string().required(),
		dateofApplication: Joi.string().required(),
		doses: Joi.number().required(),
		dateofApplication: Joi.date().required(),
		placeofApplication: Joi.string().required(),
		children: Joi.string().required(),
	});
	try {
		const { id } = req.decoded;
		const result = vaccine.validate(req.body);
		if (result.error) {
			console.log(result.error.message);
			return res.json({
				error: true,
				status: 400,
				message: result.error.message,
			});
		}
		result.value.userId = id;
		const newVaccine = new Vaccine(result.value);
		await newVaccine.save();
		return res.send({ success: true, message: 'Succesfully registered' });
	} catch (error) {
		console.error('user-logout-error', error);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};

exports.getVaccines = async (req, res) => {
	try {
		const { id } = req.decoded;
		let vaccines = await Vaccine.find({ userId: id });
		if (!vaccines) {
			return res.status(400).json({
				error: true,
				message: 'Please logout & Login again',
			});
		}

		return res.send({ success: true, message: 'success', vaccines: vaccines });
	} catch (error) {
		console.error('user-logout-error', error);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};

exports.Update = async (req, res) => {
	try {
		const {
			_id,
			dateofApplication,
			children,
			placeofApplication,
			doses,
			name,
		} = req.body;

		let vaccine = await Vaccine.findOne({ _id: _id });
		if (!vaccine) {
			return res.send({
				error: true,
				message: 'Error Found.',
			});
		}

		vaccine.dateofApplication = dateofApplication;
		vaccine.placeofApplication = placeofApplication;
		vaccine.doses = doses;
		vaccine.name = name;
		vaccine.children = children;
		vaccine.userId = req.decoded.id;
		await vaccine.save();

		return res.send({
			success: true,
			message: 'success',
		});
	} catch (error) {
		console.error('vaccine-update-error', error);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};

exports.Delete = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(403).json({
				error: true,
				message:
					"Couldn't process request. Please provide all mandatory fields",
			});
		}

		Vaccine.findOneAndRemove({ _id: id }, (err) => {
			if (err) {
				return res.send({
					error: true,
					message: 'Error Found.',
				});
			}
		});

		return res.send({
			success: true,
			message: 'success',
		});
	} catch (error) {
		console.error('vaccine-delete-error', error);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};
