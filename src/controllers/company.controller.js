import { Company } from '../models/company';
import { connect } from '../database';
import { ObjectId } from 'mongodb';

const companyController = {};

companyController.getAll = async (req, res) => {
	const db = await connect();
	const companies = await db
		.collection('companies')
		.find({})
		.toArray();
	res.json(companies);
};

companyController.getById = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	const company = db.collection('companies').findOne({ _id: new ObjectId(id) });
	res.json(company);
};

companyController.createCompany = async (req, res) => {
	const db = await connect();
	let company = new Company(req.body);
	await db.collection('companies').insertOne(company);
	res.status(201).json(company);
};

companyController.updateCompany = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	let company = new Company(req.body);
	await db.collection('companies').updateOne({ _id: new ObjectId(id) }, { $set: company });
	res.status(200).json(company);
};

companyController.deleteCompany = async (req, res) => {
	const db = await connect();
	const { id } = req.params;
	await db.collection('companies').deleteOne({ _id: new ObjectId(id) });
	res.status(200).json(`Eliminacion se realizo correctamente`);
};

export default companyController;
