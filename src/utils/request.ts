import { default as fetch, Response } from 'node-fetch';

export default async (url: string) => {
	try {
		const res: Response = await fetch(url, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
			},
		});

		return res;
	} catch (err) {
		throw err.message;
	}
};
