#!/usr/bin/env bash
set -euo pipefail

echo "==> Validating manifest.json"
node -e "JSON.parse(require('fs').readFileSync('manifest.json','utf8'))"

echo "==> Checking popup.js syntax"
node --check popup.js

echo "==> Checking required icons"
for f in icons/icon16.png icons/icon48.png icons/icon128.png; do
  if [ ! -f "$f" ]; then
    echo "Missing required icon: $f" >&2
    exit 1
  fi
done

echo "Validation passed."
