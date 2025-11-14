#!/usr/bin/env bash
set -e

APK_DIR="${APK_DIR:-/app/data/apk_descompilado}"
OUT_DIR="${OUT_DIR:-/app/web/reports}"

echo "[INFO] Proyecto: traza-apk"
echo "[INFO] APK_DIR: $APK_DIR"
echo "[INFO] OUT_DIR: $OUT_DIR"

if [ ! -d "$APK_DIR" ]; then
  echo "[ERROR] No existe APK_DIR: $APK_DIR"
  echo "[HINT] Sube tu APK descompilado a data/apk_descompilado"
fi

echo "[INFO] Ejecutando traza_funcion_real.sh..."
OUT="$OUT_DIR/reporte_funcion_real.txt" APK_DIR="$APK_DIR" bash /app/scripts/traza_funcion_real.sh

echo "[INFO] Ejecutando traza_intercom.sh..."
OUT="$OUT_DIR/reporte_intercom.txt" APK_DIR="$APK_DIR" bash /app/scripts/traza_intercom.sh

cat > /app/web/index.html << 'HTML'
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>traza-apk</title>
</head>
<body>
  <h1>Reportes de trazabilidad</h1>
  <ul>
    <li><a href="reports/reporte_funcion_real.txt" download>reporte_funcion_real.txt</a></li>
    <li><a href="reports/reporte_intercom.txt" download>reporte_intercom.txt</a></li>
  </ul>
</body>
</html>
HTML

cd /app/web
python3 -m http.server 8080
