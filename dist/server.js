"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const verifySignature_1 = require("./lib/verifySignature");
const repos_1 = require("./routes/repos");
const platforms_1 = require("./routes/platforms");
const cdn_1 = require("./routes/cdn");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rutas principales
app.use('/repos', repos_1.reposRouter);
app.use('/platforms', platforms_1.platformsRouter);
app.use('/cdn', cdn_1.cdnRouter);
// Healthcheck
app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'nexus-brain-backend' });
});
// Ejemplo (POST)
app.post('/api/ejemplo', (req, res) => {
    res.json({
        ok: true,
        recibido: req.body,
        mensaje: "Ruta POST funcionando correctamente"
    });
});
// Ejemplo (GET)
app.get('/api/ejemplo', (_req, res) => {
    res.json({
        ok: true,
        mensaje: "Hola Alma, GET funcionando correctamente."
    });
});
// ----------------------
// RUTA /api/verify REAL
// ----------------------
app.post('/api/verify', (req, res) => {
    const did = req.header('X-DID');
    const signature = req.header('X-Signature');
    if (!did || !signature) {
        return res.status(400).json({ ok: false, error: "Faltan cabeceras X-DID o X-Signature" });
    }
    const publicKey = process.env.PUBLIC_KEY;
    if (!publicKey) {
        return res.status(500).json({ ok: false, error: "PUBLIC_KEY no está configurada" });
    }
    const message = JSON.stringify(req.body);
    const valid = (0, verifySignature_1.verifySignature)(publicKey, message, signature);
    res.json({
        ok: true,
        valid,
        did,
        body: req.body,
        mensaje: valid ? "Firma válida" : "Firma inválida"
    });
});
// Iniciar servidor
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Nexus Brain API running on port ${port}`);
});
