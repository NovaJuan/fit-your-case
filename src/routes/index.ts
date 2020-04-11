import { Router } from 'express';
import { index } from '../controllers/index';
import getScrapersData from '../middlewares/scraper/getScrapersData';
import queryFormatter from '../middlewares/scraper/queryFormatter';
import cacheScraper from '../middlewares/scraper/cacheScraper';

const router = Router();

router.get('/', queryFormatter, cacheScraper, getScrapersData, index);

module.exports = router;
