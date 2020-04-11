"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = (req, res) => {
    const data = req['scrapers_data'] || { isSearching: false };
    res.render('index', data);
};
