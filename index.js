	mport express from "express";
import { analyticsMiddleware, getAnalyticsScript } from "@vercel/analytics";

const app = express();
const port = process.env.PORT || 3000;

app.use(analyticsMiddleware());
app.use(express.json());

app.get("/", (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Realwey - Servicio Railway</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
        }
        .container {
          text-align: center;
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
          color: #333;
          margin-bottom: 0.5rem;
        }
        .status {
          margin-top: 1rem;
          font-size: 1.2rem;
          color: green;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Realwey</h1>
        <p>Servicio Railway activo y funcional</p>
        <p>🚀 Vercel Web Analytics habilitado</p>
        <div class="status">✓ Online</div>
      </div>
      ${getAnalyticsScript()}
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlContent);
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    service: "realwey",
    timestamp: new Date().toISOString(),
    platform: process.env.PLATFORM || "railway",
    analytics: "enabled"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`✓ Servidor escuchando en puerto ${port}`);
  console.log(`✓ Vercel Web Analytics habilitado`);
  console.log(`✓ Accede a http://localhost:${port}`);
});

export default app;
