"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cdnRouter = void 0;
const express_1 = require("express");
const cdn_1 = require("../services/cdn");
exports.cdnRouter = (0, express_1.Router)();
exports.cdnRouter.get('/vercel', async (_req, res) => {
    res.json(await (0, cdn_1.getVercelProjects)());
});
exports.cdnRouter.get('/cloudflare', async (_req, res) => {
    res.json(await (0, cdn_1.getCloudflarePages)());
});
