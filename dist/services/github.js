"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRepos = listRepos;
exports.getRepoCommits = getRepoCommits;
const node_fetch_1 = __importDefault(require("node-fetch"));
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ORG = process.env.GITHUB_ORG;
const GITHUB_REPOS = (process.env.GITHUB_REPOS || '').split(',');
const GITHUB_API = 'https://api.github.com';
async function listRepos() {
    const repos = await Promise.all(GITHUB_REPOS.map(async (name) => {
        const res = await (0, node_fetch_1.default)(`${GITHUB_API}/repos/${GITHUB_ORG}/${name}`, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
        });
        if (!res.ok)
            return null;
        return res.json();
    }));
    return repos.filter(Boolean);
}
async function getRepoCommits(repo, limit = 10) {
    const res = await (0, node_fetch_1.default)(`${GITHUB_API}/repos/${GITHUB_ORG}/${repo}/commits?per_page=${limit}`, { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } });
    if (!res.ok)
        return [];
    return res.json();
}
