import { Request, Response, NextFunction } from 'express';
import scraper from '../../services/scraper';
import client from '../../config/redis_db';

const getScrapersData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req['scrapers_data'] !== undefined) {
		return next();
	}

	const query: string = req.query.q;
	const page: number = parseInt(req.query.page ? req.query.page : 1);

	if (!query) {
		return next();
	}

	const data = await scraper(query, page);

	// Setting pagination
	const pagination = { current: page, prev: '', next: '' };

	//Previous link------
	if (page > 1) {
		pagination.prev =
			req.url.replace(`&page=${page}`, ``) + `&page=${page - 1}`;
	}

	//Next Link--------
	if (data.totalItems >= 5) {
		pagination.next =
			req.url.replace(`&page=${page}`, ``) + `&page=${page + 1}`;
	}

	data['pagination'] = pagination;

	// Set state to isSearching = true;
	data['isSearching'] = true;

	req['scrapers_data'] = data;

	client.setex(`${query}|${page}`, 60 * 60, JSON.stringify(data));

	next();
};

export default getScrapersData;
