import { Router } from 'express';
import { listRepos, getRepoCommits } from '../services/github';

export const reposRouter = Router();

reposRouter.get('/', async (_req, res) => {
  res.json({ repos: await listRepos() });
});

reposRouter.get('/:name/commits', async (req, res) => {
  res.json({ commits: await getRepoCommits(req.params.name) });
});
