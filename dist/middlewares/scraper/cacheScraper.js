"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_db_1 = require("../../config/redis_db");
const cacheScraper = (req, res, next) => {
    if (!req.query.q) {
        return next();
    }
    const query = req.query.q;
    const page = req.query.page || 1;
    redis_db_1.default.get(`${query}|${page}`, (err, data) => {
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
exports.default = cacheScraper;
