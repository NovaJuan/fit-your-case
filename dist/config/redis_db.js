"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
exports.default = client;
