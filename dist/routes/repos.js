"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reposRouter = void 0;
const express_1 = require("express");
const github_1 = require("../services/github");
exports.reposRouter = (0, express_1.Router)();
exports.reposRouter.get('/', async (_req, res) => {
    res.json({ repos: await (0, github_1.listRepos)() });
});
exports.reposRouter.get('/:name/commits', async (req, res) => {
    res.json({ commits: await (0, github_1.getRepoCommits)(req.params.name) });
});
