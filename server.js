import express from "express";
import app from "./index.js";       // tu app modular
import { leerRSS } from "./rss.js"; // tu función real de RSS
import { Pool } from "pg";          // conexión a PostgreSQL

const server = express();
server.use(express.json());

// Montar la app original
server.use(app);

// Conexión a PostgreSQL (Render te da DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Rutas API funcionales
server.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.get("/api/comments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM comments");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta RSS
server.get("/rss", leerRSS);

// Ruta raíz
server.get("/", (req, res) => {
  res.send("Backend activo en Render - Cerebro Nexo");
});

// Escuchar en Render / Railway / Vercel
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

export default server;
