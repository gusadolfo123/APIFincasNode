import { getAllCities, addCity, deleteCity } from '../services/city.service';
import { TypeResult, Response } from '../helpers/response';

const cityController = {};

cityController.getAllCities = async (req, res) => {
	getAllCities()
		.then(cities => {
			const isEmpty = cities.length == 0 ? true : false;

			res.status(200).json(
				new Response({
					type: isEmpty ? TypeResult.Warning : TypeResult.Success,
					isError: false,
					message: isEmpty ? `No existen registros` : 'Consulta exitosa',
					object: cities,
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

cityController.createOne = async (req, res) => {
	addCity(req.body)
		.then(city => {
			res.status(200).json(
				new Response({
					type: TypeResult.Success,
					isError: false,
					message: `Registro creado correctamente`,
					object: city,
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

cityController.deleteOne = async (req, res) => {
	const { id } = req.params;

	deleteCity(id)
		.then(result => {
			if (result.deletedCount > 0)
				res.status(200).json(
					new Response({
						type: TypeResult.Success,
						isError: false,
						message: `Registro eliminado correctamente`,
					}),
				);
			else
				res.status(400).json(
					new Response({
						type: TypeResult.Info,
						isError: true,
						message: `Registro no encontrado`,
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

export default cityController;
