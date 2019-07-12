import { Company } from '../models/company';
import { connect, disconnect } from '../database';

const companyController = {};

// companyController.getAll = async (req, res) => {
// 	const db = await connect();
// 	const companies = await db
// 		.collection('companies')
// 		.find({})
// 		.toArray();
// 	res.json(companies);
// };

// companyController.getById = async (req, res) => {
// 	const db = await connect();
// 	const { id } = req.params;
// 	const company = db.collection('companies').findOne({ _id: new ObjectId(id) });
// 	res.json(company);
// };

// companyController.createCompany = async (req, res) => {
// 	const db = await connect();
// 	let company = new Company(req.body);
// 	await db.collection('companies').insertOne(company);
// 	res.status(201).json(company);
// };

// companyController.updateCompany = async (req, res) => {
// 	const db = await connect();
// 	const { id } = req.params;
// 	let company = new Company(req.body);
// 	await db.collection('companies').updateOne({ _id: new ObjectId(id) }, { $set: company });
// 	res.status(200).json(company);
// };

// companyController.deleteCompany = async (req, res) => {
// 	const db = await connect();
// 	const { id } = req.params;
// 	await db.collection('companies').deleteOne({ _id: new ObjectId(id) });
// 	res.status(200).json(`Eliminacion se realizo correctamente`);
// };

companyController.getAll = async (req, res) => {
	try {
		const company = res.status(200).send({ company });
	} catch (error) {
		res.status(400).send(error);
	} finally {
		await disconnect();
	}

	await connect();
	const companies = await db
		.collection('companies')
		.find({})
		.toArray();
	res.json(companies);
	res.status(200).send(`se realizo correctamente`);
};

companyController.getById = async (req, res) => {
	res.json('Ok');
};

companyController.createCompany = async (req, res) => {
	res.json('Ok');
};

companyController.updateCompany = async (req, res) => {
	res.json('Ok');
};

companyController.deleteCompany = async (req, res) => {
	res.json('Ok');
};

export default companyController;
