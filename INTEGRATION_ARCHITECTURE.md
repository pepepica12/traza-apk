# 🏗️ Arquitectura de Integración de Microservicios

## Visión General

Este proyecto implementa una arquitectura de microservicios para gestionar telemetría, ventas y control de inventario de forma distribuida y escalable.

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                   CLIENTE (Browser)                      │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────▼───────────┐
         │   Frontend (realwey)  │ (Puerto 3000)
         │    Next.js / React    │
         └───────────┬───────────┘
                     │
         ┌───────────▼────────────────────┐
         │      API Gateway               │
         │  (Cerebro-nexo-bankend-)       │ (Puerto 3001)
         │     Node.js / Express          │
         └───┬───┬─────┬──────┬───────────┘
             │   │     │      │
    ┌────────┘   │     │      └──────────────┐
    │            │     │                     │
    ▼            ▼     ▼                     ▼
┌────────┐ ┌─────────┐ ┌──────────┐  ┌────────────────┐
│Nefosys │ │Telemetry│ │  Auth    │  │Conectados la   │
│        │ │ Node    │ │ Service  │  │ fuente (DevOps)│
│ (DB)   │ │ (3002)  │ │          │  │                │
│ (3003) │ │         │ │          │  │                │
└────────┘ └─────────┘ └──────────┘  └────────────────┘
    │
    ▼
┌──────────────────────────────┐
│   PostgreSQL Database        │
│   (Puerto 5432)              │
└──────────────────────────────┘
```

## 🔧 Servicios

### 1. **Frontend (realwey)** - Puerto 3000
- **Stack:** Next.js, React, TypeScript
- **Responsabilidad:** Interfaz de usuario
- **Acceso a:** API Gateway (3001)

### 2. **API Gateway / Backend Principal (Cerebro-nexo-bankend-)** - Puerto 3001
- **Stack:** Node.js, Express, TypeScript
- **Responsabilidad:** Orquestación de servicios, autenticación, rutas
- **Conecta con:** Telemetría, Nefosys, Base de datos

### 3. **Telemetría (Telemetria-node)** - Puerto 3002
- **Stack:** Node.js
- **Responsabilidad:** Recopilación y análisis de datos de telemetría
- **Acceso desde:** API Gateway

### 4. **Nefosys** - Puerto 3003
- **Stack:** TypeScript, Python
- **Responsabilidad:** Gestión de compras, inventario y trazabilidad
- **Base de datos:** PostgreSQL

### 5. **DevOps (Conectados-ala-fuente-)** - Puerto 3004
- **Stack:** Shell, Python, Docker
- **Responsabilidad:** Monitoreo, logging, infraestructura

### 6. **Base de Datos (PostgreSQL)** - Puerto 5432
- **Versión:** 15+
- **Base:** cerebro_nexo
- **Usuario:** cerebro
- **Compartida entre:** Backend, Nefosys

## 🚀 Levantamiento Local

### Prerrequisitos
- Docker & Docker Compose
- Node.js 18+ (opcional, si quieres desarrollo local sin Docker)
- Git

### Pasos

1. **Clonar todos los repositorios:**
```bash
git clone https://github.com/pepepica12/Cerebro-nexo-bankend-.git
cd Cerebro-nexo-bankend-
git clone https://github.com/pepepica12/realwey.git
git clone https://github.com/pepepica12/Telemetria-node.git
git clone https://github.com/pepepica12/Nefosys.git
git clone https://github.com/pepepica12/Conectados-ala-fuente-.git
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env.local
```

3. **Iniciar con Docker Compose:**
```bash
docker-compose up -d
```

4. **Verificar servicios:**
```bash
docker-compose ps
```

5. **Ver logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f telemetria
```

## 📡 Flujo de Comunicación

### Caso de Uso: Usuario solicita estado del backend

```
1. Frontend (realwey:3000)
   └─→ GET /api/status → Backend (3001)
   
2. Backend (3001)
   ├─→ Consulta DB → PostgreSQL (5432)
   ├─→ Consulta telemetría → Telemetria-node (3002)
   └─→ Consulta inventario → Nefosys (3003)
   
3. Backend envía respuesta al Frontend
   └─→ Frontend renderiza datos
```

## 🔌 Endpoints Principales

### Backend API Gateway (3001)
```
GET  /api/status              → Estado del backend
GET  /api/health              → Health check
POST /api/auth/login          → Autenticación
GET  /api/telemetry           → Datos de telemetría
GET  /api/inventory           → Inventario de productos
GET  /api/sales               → Ventas registradas
```

## 📦 Estructura de Tipos Compartidos (Propuesto)

```
packages/
├── shared-types/
│   ├── index.ts
│   ├── api.types.ts          → Tipos de respuestas API
│   ├── models.types.ts       → Tipos de modelos (User, Product, etc.)
│   ├── telemetry.types.ts    → Tipos de telemetría
│   └── inventory.types.ts    → Tipos de inventario
```

## 🔐 Variables de Entorno

Ver `.env.example` para configuración completa.

**Importante:** Nunca commitear `.env.local` en Git.

## 🧪 Testing de Integración

```bash
# Test todos los servicios
docker-compose up -d
npm run test:integration

# Test un servicio específico
npm run test:integration -- --service=backend
npm run test:integration -- --service=telemetry
```

## 📈 Próximos Pasos

- [ ] Crear paquete `shared-types` en monorepo
- [ ] Implementar API Gateway Pattern completo
- [ ] Setup CI/CD con GitHub Actions
- [ ] Documentación de OpenAPI/Swagger
- [ ] Logging centralizado (ELK stack)
- [ ] Monitoreo con Prometheus + Grafana

## 🤝 Contribuir

1. Crear rama: `git checkout -b feature/tu-feature`
2. Commit: `git commit -am 'Add feature'`
3. Push: `git push origin feature/tu-feature`
4. Pull Request

---

**Última actualización:** 2026-03-17