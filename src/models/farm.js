export class Farm {
	constructor({ name, alias, dir, description, coordinate, images, prices, services, terms_conditions }) {
		this.name = name;
		this.alias = alias;
		this.dir = dir;
		this.description = description;
		this.coordinate = coordinate;
		this.images = images;
		this.prices = prices;
		this.services = services;
		this.terms_conditions = terms_conditions;
	}
}
