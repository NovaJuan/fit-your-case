//Data splitter
// Divides data from a page into more sub-pages
const scraperDataSetup = (page: number, qty: number, siteItems: number) => {
	const totalPages = Math.ceil(siteItems / qty);

	let sitePage = Math.ceil(page / totalPages);

	const step = page % totalPages;
	let from;
	let to;

	if (step === 0) {
		from = siteItems - qty;
		to = siteItems;
	} else {
		from = (step - 1) * qty;
		to = from + qty;
	}

	return { sitePage, from, to };
};

export default scraperDataSetup;
