#!/bin/sh
if [ -z "$SERVICE" ]; then
  echo "ERROR: La variable SERVICE no está configurada"
  exit 1
fi

exec npm run start:dev --prefix ./apps/$SERVICE
