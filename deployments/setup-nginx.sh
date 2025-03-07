#!/bin/bash

mkdir -p /var/www/deployments;

cd "$(dirname "$0")" && cd ../
PROJECT_DIR="$(pwd)"

cd $PROJECT_DIR/deployments

# if env DOMAIN_NAME is not set, use "_"
DOMAIN_NAME=${DOMAIN_NAME:-_}

# Change listen port if DOMAIN_NAME is "_"
if [ "$DOMAIN_NAME" = "_" ]; then
  # Use sed to replace listen 8080 with listen 8081 in template files
  find . -name "*.template" -exec sed -i 's/listen 8080/listen 8081/g' {} \;
  find . -name "*.template" -exec sed -i 's/server_name \$DOMAIN_NAME;/server_name _;/g' {} \;
fi

# find .template file and use envsubst to replace env variables
for file in $(find . -name "*.template"); do
  envsubst < $file | sed 's/__DOLLAR__/\$/g' > /etc/nginx/sites-enabled/${file%.template}
done


# if nginx -t detects any error, it will not reload
nginx -t && nginx -s reload

