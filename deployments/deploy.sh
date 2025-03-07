#!/bin/bash
source ~/.profile # to load nvm
# Load environment variables
#  if /env.sh exits, run it
if [ -f /env.sh ]; then
    . /env.sh
    rm /env.sh
fi
touch /env.sh
printenv | while IFS='=' read -r k v; do printf 'export %s="%s"\n' "$k" "$(printf '%s' "$v" | sed 's/"/\\"/g')"; done > /env.sh
chmod +x /env.sh
/env.sh

cd "$(dirname "$0")" && cd ../
PROJECT_DIR="$(pwd)"
cd $PROJECT_DIR/backend
nvm install
npm i -g pm2 yarn
yarn
pm2 delete api || echo "Starting pm2 process.."
pm2 start pm2.config.js
cd $PROJECT_DIR/frontend
nvm install
npm i -g pm2 yarn
yarn
yarn build
rm -rf /var/www/frontend && cp -r build /var/www/frontend
