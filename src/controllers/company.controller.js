import Company from '../models/company';

const companyController = {};

companyController.getAll = async (req, res) => {
	try {
		const companies = await Company.find({}).exec();
		res.status(200).send({ companies });
	} catch (error) {
		res.status(400).send({ error });
	}
};

companyController.getById = async (req, res) => {
	try {
		const { id } = req.params;
		const company = await Company.findById({ id });
		res.status(200).send({ company });
	} catch (error) {
		res.status(400).send({ error });
	}
};

companyController.createCompany = async (req, res) => {
	try {
		const company = new Company(req.body);
		await company.save();
		res.status(200).send({ company });
	} catch (error) {
		res.status(400).send({ error });
	}
};

companyController.updateCompany = async (req, res) => {
	try {
		const { id } = req.params;
		const company = await Company.findByIdAndUpdate(id, { $set: req.body });
		res.status(200).send({ company });
	} catch (error) {
		res.status(400).send({ error });
	}
};

companyController.deleteCompany = async (req, res) => {
	try {
		const { id } = req.params;
		await Company.deleteOne({ _id: id });
		res.status(200).send(`Compañia eliminada correctamente`);
	} catch (error) {
		res.status(400).send({ error });
	}
};

export default companyController;
