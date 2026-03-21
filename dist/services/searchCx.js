"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCx = searchCx;
const node_fetch_1 = __importDefault(require("node-fetch"));
const API_KEY = process.env.GOOGLE_CSE_API_KEY;
const CX = process.env.GOOGLE_CSE_CX;
async function searchCx(query) {
    if (!API_KEY || !CX)
        return [];
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('cx', CX);
    url.searchParams.set('q', query);
    const res = await (0, node_fetch_1.default)(url.toString());
    if (!res.ok)
        return [];
    const json = await res.json();
    return json.items || [];
}
