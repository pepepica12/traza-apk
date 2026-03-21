import { Router } from 'express';
import { searchCx } from '../services/searchCx';

export const searchCxRouter = Router();

searchCxRouter.get('/', async (req, res) => {
  const q = (req.query.q as string) || '';
  if (!q) return res.status(400).json({ error: 'Missing q' });
  res.json({ results: await searchCx(q) });
});
