#!/usr/bin/env bash
# Пересобирает Tailwind для темы init. Нужно только после правки классов в шаблонах.
set -euo pipefail

THEME_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$THEME_DIR/../.." && pwd)"
TAILWIND="${TAILWIND:-$ROOT_DIR/.tools/tailwindcss}"

if [[ ! -x "$TAILWIND" ]]; then
  echo "Tailwind CLI не найден: $TAILWIND" >&2
  echo "Нужен standalone Tailwind CLI v3.4.17 — см. themes/init/README.md" >&2
  exit 1
fi

"$TAILWIND" \
  --config "$THEME_DIR/tailwind.config.js" \
  --input "$THEME_DIR/assets/css/tailwind.css" \
  --output "$THEME_DIR/assets/css/tailwind.built.css" \
  --minify
