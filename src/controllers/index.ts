import { Request, Response } from 'express';

export const index = (req: Request, res: Response): void => {
	const data = req['scrapers_data'] || { isSearching: false };
	res.render('index', data);
};
