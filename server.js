import express from "express";
import { Pool } from "pg";
import cors from "cors";
import { leerRSS } from "./rss.js";

const server = express();
server.use(cors());
server.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://new_query_user:KGhVrKzif7mJVwQFZzVmEJvi2lMndmJb@dpg-d6eapn94tr6s73bai0ag-a.oregon-postgres.render.com/new_query",
  ssl: { rejectUnauthorized: false }
});

// Endpoints API
server.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
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

// Rutas adicionales para frontend
server.get("/api/estudiantes", (req, res) => {
  res.json({ mensaje: "Ruta Estudiantes activa" });
});

server.get("/api/hogar", (req, res) => {
  res.json({ mensaje: "Ruta Hogar activa" });
});

server.get("/api/negocios", (req, res) => {
  res.json({ mensaje: "Ruta Negocios activa" });
});

server.get("/api/comunidad", (req, res) => {
  res.json({ mensaje: "Ruta Comunidad activa" });
});

server.get("/api/ejemplo", (req, res) => {
  res.json({ mensaje: "Backend conectado correctamente" });
});

// Escuchar en Render / Railway / Vercel
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

export default server;
