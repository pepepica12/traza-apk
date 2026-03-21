import fetch from 'node-fetch';

export async function getRailwayServices() {
  const token = process.env.RAILWAY_API_TOKEN;
  if (!token) return [];
  const res = await fetch('https://backboard.railway.app/graphql/v2', {
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

export async function getRenderServices() {
  const token = process.env.RENDER_API_TOKEN;
  if (!token) return [];
  const res = await fetch('https://api.render.com/v1/services', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return [];
  return res.json();
}
