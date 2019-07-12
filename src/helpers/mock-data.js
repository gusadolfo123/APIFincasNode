import faker from 'faker/locale/es_MX';
import { Farm } from '../models/farm';
import { Service } from '../models/service';
import { Company } from '../models/company';
import { Season } from '../models/season';
import { connect } from '../database';

const mockData = {};

mockData.generateFarms = async (req, res) => {
	let listServices = [];
	let farms = [];
	const db = await connect();

	// seasons
	let midSeason = [];
	let highSeason = [];

	for (let index = 0; index < 20; index++) {
		midSeason.push(
			faker.date
				.future()
				.toLocaleString()
				.split(' ')[0],
		);
		highSeason.push(
			faker.date
				.future()
				.toLocaleString()
				.split(' ')[0],
		);
	}

	const newSeason = new Season({
		mid: midSeason,
		hight: highSeason,
	});

	await db.collection('seasons').insertOne(newSeason);

	// company
	const newCompany = new Company({
		name: faker.company.companyName(),
		dir: faker.address.secondaryAddress(),
		coordinate: {
			lat: faker.address.latitude(),
			lon: faker.address.longitude(),
		},
		phones: [
			{
				phone_type: 'Celular',
				number: faker.phone.phoneNumber(),
			},
			{
				phone_type: 'Local',
				number: faker.phone.phoneNumber(),
			},
		],
		whatsapp: faker.phone.phoneNumber(),
		images: [
			{
				name: faker.image.business.name,
				url: 'https://picsum.photos/1920/800/?image=' + faker.random.number(1084),
				size: 7878.787,
			},
			{
				name: faker.image.business.name,
				url: 'https://picsum.photos/1920/800/?image=' + faker.random.number(1084),
				size: 45555.23,
			},
		],
		mission: faker.lorem.text(5),
		vision: faker.lorem.text(5),
		description: faker.lorem.text(5),
	});

	await db.collection('companies').insertOne(newCompany);

	// services
	for (let index = 0; index < 5; index++) {
		const newService = new Service({
			name: faker.company.companyName(),
			description: faker.lorem.words(5),
			icon: 'fas fa-futbol',
		});
		listServices.push(newService);
	}

	await db.collection('services').insertMany(listServices);

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
	res.status(200).json({ newSeason, newCompany, listServices, farms });
};

export default mockData;
