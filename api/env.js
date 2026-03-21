export default function handler(req, res) {
  res.json({
    secret: process.env.VERCEL_PLATFORM_PROTECTION || 'not set',
    allEnv: process.env
  });
}
