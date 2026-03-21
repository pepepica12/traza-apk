import fetch from 'node-fetch';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_ORG = process.env.GITHUB_ORG!;
const GITHUB_REPOS = (process.env.GITHUB_REPOS || '').split(',');
const GITHUB_API = 'https://api.github.com';

export async function listRepos() {
  const repos = await Promise.all(
    GITHUB_REPOS.map(async (name) => {
      const res = await fetch(`${GITHUB_API}/repos/${GITHUB_ORG}/${name}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
      });
      if (!res.ok) return null;
      return res.json();
    })
  );
  return repos.filter(Boolean);
}

export async function getRepoCommits(repo: string, limit = 10) {
  const res = await fetch(
    `${GITHUB_API}/repos/${GITHUB_ORG}/${repo}/commits?per_page=${limit}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );
  if (!res.ok) return [];
  return res.json();
}
