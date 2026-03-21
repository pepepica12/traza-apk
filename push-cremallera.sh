#!/data/data/com.termux/files/usr/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)
echo "🧭 Rama actual: $branch"

token="ghp_rail-deploy2"
usuario="joselopez94275"
repo="cremallera"
url="https://${token}@github.com/${usuario}/${repo}.git"

echo "🔁 Configurando remoto..."
git remote set-url origin "$url"

echo "🔍 Verificando remoto:"
git remote -v

echo "🛡️ Configurando ~/.netrc para autenticación silenciosa..."
cat > ~/.netrc <<EOF
machine github.com
login ${usuario}
password ${token}
EOF
chmod 600 ~/.netrc

echo "🚀 Ejecutando push a origin/$branch..."
git push -u origin "$branch"

echo "🔎 Validando existencia del repositorio en GitHub..."
curl -s -o /dev/null -w "%{http_code}" "https://github.com/${usuario}/${repo}" | grep -q "200" \
  && echo "✅ Repositorio existe y es accesible" \
  || echo "❌ Repositorio no encontrado o es privado sin acceso"

echo "🧩 Listo. Verifica en GitHub y Railway si el deploy fue exitoso."
