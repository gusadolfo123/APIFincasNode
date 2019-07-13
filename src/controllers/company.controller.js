import Company from '../models/company';
import { connect, disconnect } from '../database';

const companyController = {};

companyController.getAll = async (req, res) => {
	try {
		console.log('1. companyController.getAll');
		await connect();
		console.log('2. companyController.getAll');
		const companies = await Company.find({}).exec();
		res.status(200).send({ companies });
	} catch (error) {
		res.status(400).send({ error });
	} finally {
		console.log('3. companyController.getAll');
		await disconnect();
		console.log('4. companyController.getAll');
	}
};

companyController.getById = async (req, res) => {
	try {
		await connect();
		const { id } = req.params;
		const company = await Company.findById({ id });
		res.status(200).send({ company });
	} catch (error) {
		res.status(400).send({ error });
	} finally {
		await disconnect();
	}
};

companyController.createCompany = async (req, res) => {
	try {
		await connect();
		const company = new Company(req.body);
		await company.save();
		res.status(200).send({ company });
	} catch (error) {
		res.status(400).send({ error });
	} finally {
		await disconnect();
	}
};

companyController.updateCompany = async (req, res) => {
	try {
		await connect();
		const { id } = req.params;
		const company = await Company.findByIdAndUpdate(id, { $set: req.body });
		res.status(200).send({ company });
	} catch (error) {
		res.status(400).send({ error });
	} finally {
		await disconnect();
	}
};

companyController.deleteCompany = async (req, res) => {
	try {
		await connect();
		const { id } = req.params;
		await Company.deleteOne({ _id: id });
		res.status(200).send(`Compañia eliminada correctamente`);
	} catch (error) {
		res.status(400).send({ error });
	} finally {
		await disconnect();
	}
};

export default companyController;
