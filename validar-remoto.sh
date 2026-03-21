#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Validando configuración de remoto Git..."

# 1. Verificar si hay remoto configurado
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
  echo "❌ No hay remoto 'origin' configurado."
  echo "ℹ️  Usa: git remote add origin https://github.com/usuario/repositorio.git"
  exit 1
fi

echo "✅ Remoto 'origin' detectado: $REMOTE_URL"

# 2. Probar acceso al repositorio remoto
echo -e "\n🌐 Probando acceso al repositorio remoto..."
git ls-remote "$REMOTE_URL" &>/dev/null

if [ $? -eq 0 ]; then
  echo "✅ Acceso confirmado al repositorio remoto"
else
  echo "❌ No se puede acceder al repositorio remoto"
  echo "⚠️  Posibles causas:"
  echo "   - El repositorio no existe"
  echo "   - El nombre de usuario o repositorio está mal escrito"
  echo "   - No tienes permisos para acceder"
  echo "   - No estás autenticado con GitHub"
  echo -e "\n🔧 Para corregir:"
  echo "   git remote set-url origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git"
fi

echo -e "\n✅ Validación completada."
