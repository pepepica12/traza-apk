#!/bin/bash
# Script de validación forense para Render
# Alma - Cerebro Nexo Backend

BASE_URL="https://nd.onrender.com"

echo "🔍 Validando backend en Render ($BASE_URL)"
echo "========================================="

# Lista de endpoints a validar
endpoints=(
  "/"
  "/api/health"
  "/api/posts"
  "/api/chapters"
  "/api/events"
  "/api/comments/1"
)

# Iterar sobre cada endpoint
for endpoint in "${endpoints[@]}"; do
  echo "👉 Probando $endpoint"
  response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")

  if [ "$response" == "200" ]; then
    echo "✅ OK ($response)"
    curl -s "$BASE_URL$endpoint"
  else
    echo "❌ ERROR ($response)"
  fi
  echo "-----------------------------------------"
done
