# Proyecto `realway-nuevo`

Servidor Express básico para despliegue en Railway. Estructura idéntica a `realwey`, creado desde cero para trazabilidad y reversibilidad total.
=======
# traza-apk

Genera reportes de trazabilidad desde un APK descompilado (imágenes → layouts → clases → endpoints), y reportes específicos de Intercom. Sirve los resultados vía HTTP.

## Variables
- APK_DIR: ruta del APK descompilado (default `/app/data/apk_descompilado`)
- OUT_DIR: ruta de salida para reportes (default `/app/web/reports`)

## Despliegue en Railway
1. Conecta este repo a Railway (“Deploy from GitHub”).
2. Variables: `APK_DIR=/app/data/apk_descompilado`, `OUT_DIR=/app/web/reports`.
3. Coloca tu APK descompilado en `data/apk_descompilado/` y haz commit.
4. Abre el dominio del servicio y descarga los reportes:

- `/reports/reporte_funcion_real.txt`
- `/reports/reporte_intercom.txt`
