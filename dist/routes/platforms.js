"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformsRouter = void 0;
const express_1 = require("express");
const platforms_1 = require("../services/platforms");
exports.platformsRouter = (0, express_1.Router)();
exports.platformsRouter.get('/railway', async (_req, res) => {
    res.json(await (0, platforms_1.getRailwayServices)());
});
exports.platformsRouter.get('/render', async (_req, res) => {
    res.json(await (0, platforms_1.getRenderServices)());
});
