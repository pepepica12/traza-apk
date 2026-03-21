#!/usr/bin/env bash
BASE_DIR="$HOME/nexus-repos"
REPOS=(
  "nexus-frontend"
  "nexus-backend-api"
  "nexus-runners"
  "nexus-cdn"
  "nexus-search"
  "nexus-brain"
)

mkdir -p "$BASE_DIR"
cd "$BASE_DIR" || exit 1

for repo in "${REPOS[@]}"; do
  if [ -d "$repo/.git" ]; then
    echo "==> Actualizando $repo"
    cd "$repo" && git pull && cd ..
  else
    echo "==> Clonando $repo"
    git clone "git@github.com:TU_USER_OR_ORG/$repo.git"
  fi
done
