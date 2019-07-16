import { getAllCompanies, getCompanyById, updateCompany, createCompany, deleteCompany, getCompaniesPerPage } from '../services/company.service';
import { Response, TypeResult } from '../helpers/response';
import { isNullOrUndefined } from 'util';

const companyController = {};

companyController.getAll = async (req, res) => {
	getAllCompanies()
		.then(companies => {
			const isEmpty = companies.length == 0;
			res.status(200).json(
				new Response({
					type: isEmpty ? TypeResult.Warning : TypeResult.Success,
					isError: false,
					message: isEmpty ? `No existen registros` : 'Consulta exitosa',
					object: companies,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

companyController.getById = async (req, res) => {
	const { id } = req.params;

	getCompanyById(id)
		.then(company => {
			const isEmpty = isNullOrUndefined(company);
			res.status(200).json(
				new Response({
					type: isEmpty ? TypeResult.Warning : TypeResult.Success,
					isError: false,
					message: isEmpty ? `No existen registros` : 'Consulta exitosa',
					object: company,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

companyController.createCompany = async (req, res) => {
	createCompany(req.body)
		.then(farm => {
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro creado correctamente`,
					object: farm,
				}),
			);
		})
		.catch(error => {
			res.status(400).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: error,
				}),
			);
		});
};

companyController.updateCompany = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Company.updateOne({ _id: id }, req.body);

		if (result.nModified > 0)
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro modificado correctamente`,
				}),
			);
		else {
			res.status(400).json(
				new Response({
					type: TypeResult.Info,
					isError: true,
					message: `Registro no encontrado`,
				}),
			);
		}
	} catch (error) {
		res.status(400).json(
			new Response({
				type: TypeResult.Danger,
				isError: true,
				message: error,
			}),
		);
	}
};

companyController.deleteCompany = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await Company.deleteOne({ _id: id });

		if (result.deletedCount > 0)
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro eliminado correctamente`,
				}),
			);

		if (result.n == 0)
			res.status(200).json(
				new Response({
					type: TypeResult.Danger,
					isError: true,
					message: `Registro no encontrado`,
				}),
			);
	} catch (error) {
		res.status(400).json(
			new Response({
				type: TypeResult.Danger,
				isError: true,
				message: error,
			}),
		);
	}
};

export default companyController;
