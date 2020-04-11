"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("../../services/scraper");
const redis_db_1 = require("../../config/redis_db");
const getScrapersData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req['scrapers_data'] !== undefined) {
        return next();
    }
    const query = req.query.q;
    const page = parseInt(req.query.page ? req.query.page : 1);
    if (!query) {
        return next();
    }
    const data = yield scraper_1.default(query, page);
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
    redis_db_1.default.setex(`${query}|${page}`, 60 * 60, JSON.stringify(data));
    next();
});
exports.default = getScrapersData;
