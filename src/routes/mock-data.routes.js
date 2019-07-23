import mockData from '../helpers/mock-data';

function MockRouter(router) {
	router.get('/generate-mock-data', mockData.generateData);
	return router;
}

module.exports = MockRouter;
