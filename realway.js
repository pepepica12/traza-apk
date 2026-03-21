import express from 'express';
import { analyticsMiddleware } from './lib/analytics.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Vercel Web Analytics
app.use(analyticsMiddleware());

app.get('/', (req, res) => {
  res.send('Servidor realway.js activo y trazable');
});

app.listen(PORT, () => {
  console.log(`Servidor realway.js corriendo en puerto ${PORT}`);
});
