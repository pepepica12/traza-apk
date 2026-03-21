"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCxRouter = void 0;
const express_1 = require("express");
const searchCx_1 = require("../services/searchCx");
exports.searchCxRouter = (0, express_1.Router)();
exports.searchCxRouter.get('/', async (req, res) => {
    const q = req.query.q || '';
    if (!q)
        return res.status(400).json({ error: 'Missing q' });
    res.json({ results: await (0, searchCx_1.searchCx)(q) });
});
