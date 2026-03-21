import { Router } from 'express';
import { getVercelProjects, getCloudflarePages } from '../services/cdn';

export const cdnRouter = Router();

cdnRouter.get('/vercel', async (_req, res) => {
  res.json(await getVercelProjects());
});

cdnRouter.get('/cloudflare', async (_req, res) => {
  res.json(await getCloudflarePages());
});
