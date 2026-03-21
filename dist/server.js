import express from "express";
import bodyParser from "body-parser";
import pool from "./db.js";

const app = express();
app.use(bodyParser.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Backend activo en Render - Cerebro Nexo");
});

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "cerebro-nexo-backend" });
});

/* ============================
   Endpoints principales con Postgres
   ============================ */

// Posts
app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, title, content FROM posts");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear post" });
  }
});

// Chapters
app.get("/api/chapters", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, description FROM chapters");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener capítulos" });
  }
});

app.post("/api/chapters", async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO chapters (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear capítulo" });
  }
});

// Events
app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, event, date FROM events");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener eventos" });
  }
});

app.post("/api/events", async (req, res) => {
  const { event, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO events (event, date) VALUES ($1, $2) RETURNING *",
      [event, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear evento" });
  }
});

// Comments
app.get("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT id, post_id, comment FROM comments WHERE id=$1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener comentario" });
  }
});

app.post("/api/comments", async (req, res) => {
  const { postId, comment } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comments (post_id, comment) VALUES ($1, $2) RETURNING *",
      [postId, comment]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear comentario" });
  }
});

// Users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

/* ============================
   Puerto dinámico para Render
   ============================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
