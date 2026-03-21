"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRailwayServices = getRailwayServices;
exports.getRenderServices = getRenderServices;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function getRailwayServices() {
    const token = process.env.RAILWAY_API_TOKEN;
    if (!token)
        return [];
    const res = await (0, node_fetch_1.default)('https://backboard.railway.app/graphql/v2', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: '{ me { projects { id name services { id name health } } } }'
        })
    });
    const json = await res.json();
    return json.data?.me?.projects || [];
}
async function getRenderServices() {
    const token = process.env.RENDER_API_TOKEN;
    if (!token)
        return [];
    const res = await (0, node_fetch_1.default)('https://api.render.com/v1/services', {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok)
        return [];
    return res.json();
}
