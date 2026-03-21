#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Iniciando auditoría de despliegue Node.js + Railway..."
echo "📁 Directorio actual: $(pwd)"

# 1. Verificar existencia de archivos clave
echo -e "\n📦 Verificando archivos clave..."
for file in server.js Procfile package.json; do
  if [ -f "$file" ]; then
    echo "✅ $file encontrado"
  else
    echo "❌ $file NO encontrado"
  fi
done

# 2. Verificar si server.js contiene ruta raíz
echo -e "\n🔎 Buscando ruta raíz '/' en server.js..."
if grep -q "app.get('/'" server.js; then
  echo "✅ Ruta raíz '/' definida"
else
  echo "⚠️  Ruta raíz '/' NO definida"
fi

# 3. Verificar uso de process.env.PORT
echo -e "\n🔎 Verificando uso de process.env.PORT..."
if grep -q "process.env.PORT" server.js; then
  echo "✅ Uso dinámico de puerto detectado"
else
  echo "❌ No se detecta uso de process.env.PORT"
fi

# 4. Verificar contenido de Procfile
echo -e "\n📄 Contenido de Procfile:"
if [ -f Procfile ]; then
  cat Procfile
else
  echo "⚠️  Procfile no encontrado"
fi

# 5. Verificar si puerto 8080 está ocupado
echo -e "\n🔌 Verificando si el puerto 8080 está ocupado..."
if lsof -i :8080 | grep LISTEN; then
  echo "⚠️  Puerto 8080 en uso:"
  lsof -i :8080 | grep LISTEN
else
  echo "✅ Puerto 8080 libre"
fi

# 6. Probar curl contra Railway
echo -e "\n🌐 Probar exposición pública en Railway..."
curl -s -o /dev/null -w "%{http_code}\n" https://desplegar-production-f510.up.railway.app

echo -e "\n✅ Auditoría completada."
