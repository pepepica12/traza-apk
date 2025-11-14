#!/usr/bin/env bash
set -e
APK_DIR="${APK_DIR:-/app/data/apk_descompilado}"
OUT="${OUT:-/app/web/reports/reporte_funcion_real.txt}"

echo "== Reporte de función real de imágenes ==" > "$OUT"

IMAGENES=$(find "$APK_DIR" -type f \
  \( -path "*/res/drawable*" -o -path "*/res/mipmap*" -o -path "*/assets*" \) \
  -regex '.*\.\(png\|jpg\|jpeg\|webp\|xml\)' | sort)

for IMG_PATH in $IMAGENES; do
  IMG=$(basename "$IMG_PATH")
  echo -e "\n-------------------------------" >> "$OUT"
  echo "🖼 Recurso: $IMG" >> "$OUT"
  echo "Ruta: $IMG_PATH" >> "$OUT"

  LAYOUTS=$(grep -rl "$IMG" "$APK_DIR/res/layout" 2>/dev/null || true)
  if [ -n "$LAYOUTS" ]; then
    echo "📄 Layouts que la activan:" >> "$OUT"
    echo "$LAYOUTS" | sed 's#.*/##' >> "$OUT"
  else
    echo "📄 Layouts: sin referencia directa" >> "$OUT"
  fi

  case "$IMG" in
    *stori*|*card*) echo "🔖 Función real: Módulo tarjeta Stori / gestión financiera" >> "$OUT";;
    *intercom*) echo "🔖 Función real: SDK Intercom – help center/chat" >> "$OUT";;
    *braze*) echo "🔖 Función real: SDK Braze – mensajes in-app" >> "$OUT";;
    *google_signin*) echo "🔖 Función real: Autenticación Google OAuth" >> "$OUT";;
    *) echo "🔖 Función real: Genérico / por clasificar" >> "$OUT";;
  esac
done

echo -e "\n✅ Reporte generado en: $OUT"
