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
const importer_1 = require("../../utils/importer");
const scrapers = importer_1.default({
    dir: __dirname,
    patterns: new Set(['.scraper.ts', '.scraper.js']),
    returnAs: 'array',
});
const scraper = (query, page = 1) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Promise.all(scrapers.map((scraper) => __awaiter(void 0, void 0, void 0, function* () { return yield scraper(query, page); })));
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
});
exports.default = scraper;
