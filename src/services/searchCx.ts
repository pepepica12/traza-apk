import fetch from 'node-fetch';

const API_KEY = process.env.GOOGLE_CSE_API_KEY!;
const CX = process.env.GOOGLE_CSE_CX!;

export async function searchCx(query: string) {
  if (!API_KEY || !CX) return [];
  const url = new URL('https://www.googleapis.com/customsearch/v1');
  url.searchParams.set('key', API_KEY);
  url.searchParams.set('cx', CX);
  url.searchParams.set('q', query);

  const res = await fetch(url.toString());
  if (!res.ok) return [];
  const json = await res.json();
  return json.items || [];
}
