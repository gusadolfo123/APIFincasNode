import faker from 'faker/locale/es_MX';
import { Farm } from '../models/farm';
import { Service } from '../models/service';
import { Company } from "../models/company";
import { connect } from '../database';

const mockData = {};

mockData.generateFarms = async (req, res) => {
	let listServices = [];
	let farms = [];
	const db = await connect();

	// company
	const company = new Company({
		name: "AlquilamosFincas",
		dir: "Cll Falsa 123",
		coordinate: {
			lat: 7.045465,
			lon: 0.12165
		},
		phones: [
			{}
		]
	});

	// services
	for (let index = 0; index < 5; index++) {
		const newService = new Service({
			name: faker.company.companyName(),
			description: faker.lorem.words(5),
			icon: 'fas fa-futbol',
		});
		listServices.push(newService);
	}

	db.collection('services').insertMany(listServices);

	for (let index = 0; index < 10; index++) {
		const newFarm = new Farm({
			name: faker.company.companyName(),
			alias: faker.company.companySuffix(),
			dir: faker.address.secondaryAddress(),
			description: faker.lorem.sentence(5, 5),
			coordinate: {
				lat: faker.address.latitude(),
				lon: faker.address.longitude(),
			},
			images: [
				{
					name: faker.image.nature.name,
					url: 'https://picsum.photos/1920/800/?image=' + faker.random.number(1084), // faker.image.imageUrl(1920, 800, 'nature', true, true),
					size: 9545493.45,
				},
				{
					name: faker.image.nature.name,
					url: 'https://picsum.photos/1920/800/?image=' + faker.random.number(1084), // faker.image.imageUrl(1920, 800, 'nature', true, true),
					size: 9545493.45,
				},
			],
			prices: {
				low_season: {
					total: faker.commerce.price(800000, 3500000, 2),
					per_person: faker.commerce.price(120000, 350000, 2),
				},
				mid_season: {
					total: faker.commerce.price(1200000, 3500000, 2),
					per_person: faker.commerce.price(120000, 350000, 2),
				},
				high_season: {
					total: faker.commerce.price(1200000, 3500000, 2),
					per_person: faker.commerce.price(180000, 350000, 2),
				},
			},
			services: [listServices[0]._id.toString(), listServices[1]._id.toString()],
			terms_conditions: [
				faker.random.words(5),
				faker.random.words(5),
				faker.random.words(5),
				faker.random.words(5),
				faker.random.words(5),
			],
		});
		farms.push(newFarm);
	}
	await db.collection('farms').insertMany(farms);
	res.status(200).json(farms);
};

export default mockData;
