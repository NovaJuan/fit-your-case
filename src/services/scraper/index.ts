import importer from '../../utils/importer';
const scrapers = importer({
	dir: __dirname,
	patterns: new Set(['.scraper.ts', '.scraper.js']),
	returnAs: 'array',
});

export interface Item {
	photo: string;
	price: string;
	name: string;
	link: string;
	score: string;
	site: string;
}

export interface ScraperResults {
	results: Item[];
	total: number;
	site: string;
}

process.on('message', async (message) => {
	const data = await scraper(message.query, message.page);
	process.send(data);
	process.exit();
});

const scraper = async (query: string, page: number = 1) => {
	const data: ScraperResults[] = await Promise.all(
		scrapers.map(
			async (scraper): Promise<ScraperResults> => await scraper(query, page)
		)
	);

	let items = [];
	let totalItems = 0;

	data.map((i) => {
		items = items.concat(i.results);
		totalItems += i.total;
	});

	const results = {
		items,
		totalItems,
	};

	return results;
};

export default scraper;
