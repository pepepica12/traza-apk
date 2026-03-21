import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Ruta raíz para Render
app.get("/", (req, res) => {
  res.send("Backend activo en Render - Cerebro Nexo");
});

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "cerebro-nexo-backend" });
});

/* ============================
   Endpoints principales
   ============================ */

// Posts
app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, title: "Primer post", content: "Contenido inicial" },
    { id: 2, title: "Segundo post", content: "Más contenido" }
  ]);
});

app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;
  res.json({ id: Date.now(), title, content });
});

// Capítulos
app.get("/api/chapters", (req, res) => {
  res.json([
    { id: 1, name: "Capítulo 1", description: "Introducción" },
    { id: 2, name: "Capítulo 2", description: "Desarrollo" }
  ]);
});

app.post("/api/chapters", (req, res) => {
  const { name, description } = req.body;
  res.json({ id: Date.now(), name, description });
});

// Eventos
app.get("/api/events", (req, res) => {
  res.json([
    { id: 1, event: "Evento inicial", date: "2026-02-23" },
    { id: 2, event: "Evento futuro", date: "2026-03-01" }
  ]);
});

app.post("/api/events", (req, res) => {
  const { event, date } = req.body;
  res.json({ id: Date.now(), event, date });
});

// Comentarios
app.get("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, comment: "Comentario de prueba para el recurso " + id });
});

app.post("/api/comments", (req, res) => {
  const { postId, comment } = req.body;
  res.json({ id: Date.now(), postId, comment });
});

// Usuarios
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Usuario 1", email: "user1@example.com" },
    { id: 2, name: "Usuario 2", email: "user2@example.com" }
  ]);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  res.json({ id: Date.now(), name, email });
});

/* ============================
   Puerto dinámico para Render
   ============================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
