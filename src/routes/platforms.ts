import { Router } from 'express';
import { getRailwayServices, getRenderServices } from '../services/platforms';

export const platformsRouter = Router();

platformsRouter.get('/railway', async (_req, res) => {
  res.json(await getRailwayServices());
});

platformsRouter.get('/render', async (_req, res) => {
  res.json(await getRenderServices());
});
