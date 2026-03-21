"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVercelProjects = getVercelProjects;
exports.getCloudflarePages = getCloudflarePages;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function getVercelProjects() {
    const token = process.env.VERCEL_TOKEN;
    const orgId = process.env.VERCEL_ORG_ID;
    if (!token || !orgId)
        return [];
    const res = await (0, node_fetch_1.default)(`https://api.vercel.com/v9/projects?teamId=${orgId}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok)
        return [];
    return res.json();
}
async function getCloudflarePages() {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    if (!token || !accountId)
        return [];
    const res = await (0, node_fetch_1.default)(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok)
        return [];
    return res.json();
}
