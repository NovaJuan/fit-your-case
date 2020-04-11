import request from '../../utils/request';
import scraperDataSetup from '../../utils/scraperDataSetup';
import { Response } from 'node-fetch';
import * as cheerio from 'cheerio';
import { Item, ScraperResults } from '.';

const amazonScraper = async (
	query: string,
	page: number = 1
): Promise<ScraperResults> => {
	const q = query.replace(/\s/g, '+').toLowerCase();

	let setup = scraperDataSetup(page, 5, 48);

	try {
		const res: Response = await request(
			`https://www.amazon.com/s?k=${q}+case&page=${setup.sitePage}&s=review-rank`
		);

		console.log(res);

		const $ = cheerio.load(await res.text());

		let items = $('div.s-result-list.s-search-results.sg-row').find(
			'.s-result-item'
		);

		items = items.slice(setup.from, setup.to);

		const totalItems = items.length;

		let products: Item[] = [];

		items.map((i, el) => {
			// Extracting product photo
			const photo = $(el)
				.find('div.a-section.aok-relative.s-image-square-aspect img')[0]
				.attribs.src.trim();

			// Extracting product name
			let name = $(el).find('span.a-size-base-plus.a-color-base.a-text-normal')[
				'0'
			].children[0].data;

			if (name.length > 100) {
				name = name.substr(0, 100) + '...';
			}

			// Extracting product price
			let price = $(el).find('span.a-price span.a-offscreen').text();

			if (price.length === 0) {
				price = 'Other sellers/Out of stock';
			}

			// Extracting product link
			const link =
				'https://amazon.com' +
				$(el)
					.find('span.rush-component a.a-link-normal')[0]
					.attribs.href.trim();

			// Extracting product name
			let score = $(el).find(
				'div.a-section.a-spacing-none.a-spacing-top-micro div.a-row.a-size-small span'
			)['0'];

			if (score !== undefined) {
				score = score.attribs['aria-label'];
			} else {
				score = 'No score';
			}

			// Product site
			const site = 'amazon';

			products.push({
				name,
				photo,
				price,
				score,
				site,
				link,
			});
		});

		return { results: products, total: totalItems, site: 'amazon' };
	} catch (err) {
		throw err;
	}
};

// Use commonjs because 'export default ...' doesn't return the function.
// With 'export default ...' it return {default:Fuction...} using require()
module.exports = amazonScraper;
