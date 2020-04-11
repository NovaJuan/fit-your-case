import { Request, Response, NextFunction } from 'express';

const queryFormatter = (req: Request, res: Response, next: NextFunction) => {
	if (!req.query.make || !req.query.model || !req.query.version) {
		return next();
	}

	// Format strings to avoid reated words
	let lastModelWord = req.query['model'].split(' ').pop();
	req.query['version'] = req.query['version']
		.replace(`${lastModelWord}`, '')
		.trim();

	req.query.q = `${req.query['make']} ${req.query['model']} ${req.query['version']}`.trim();

	next();
};

export default queryFormatter;
