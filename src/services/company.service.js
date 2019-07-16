import Company from '../models/company';

export async function getAllCompanies() {
	const companies = await Company.find({});
	return companies;
}

export async function getCompanyById(id) {
	const company = await Company.findOne({ _id: id });
	return company;
}

export async function createCompany(data) {
	const company = new Company(data);
	await company.save();
	return company;
}

export async function updateCompany(id, data) {
	const result = await Company.updateOne({ _id: id }, data);
	return result;
}

export async function deleteCompany(id) {
	const result = await Company.deleteOne({ _id: id });
	return result;
}

export async function getCompaniesPerPage(page) {
	const perPage = 2;
	const count = await Company.countDocuments();
	const companies = await Company.find({})
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec();

	return {
		companies,
		current: page,
		pages: Math.ceil(count / perPage),
		total: count,
	};
}
