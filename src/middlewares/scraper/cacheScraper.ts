import { Request, Response, NextFunction } from 'express';
import client from '../../config/redis_db';

const cacheScraper = (req: Request, res: Response, next: NextFunction) => {
	if (!req.query.q) {
		return next();
	}

	const query = req.query.q;
	const page = req.query.page || 1;

	client.get(`${query}|${page}`, (err, data) => {
		if (err) {
			console.error(err);
			return next();
		}

		if (data !== null) {
			req['scrapers_data'] = JSON.parse(data);
		}

		return next();
	});
};

export default cacheScraper;
