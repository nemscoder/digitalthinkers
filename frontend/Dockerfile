FROM node:16-alpine AS build-stage

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


FROM nginx:alpine AS production-stage

ARG BACKEND_PORT

RUN { \
    echo 'server_tokens off;'; \
    echo 'upstream backend {'; \
    echo '  server backend:6000;'; \
    echo '}'; \
    echo 'server {'; \
    echo '    listen                80;'; \
    echo '    access_log            off;'; \
#    echo '    tcp_nodelay           ${NGINX_NODELAY};'; \
#    echo '    sendfile              ${NGINX_SENDFILE};'; \
    echo '    autoindex             off;'; \
    echo '    server_tokens         off;'; \
#    echo '    client_max_body_size  ${NGINX_MAX_BODY_SIZE};'; \
    echo '    gzip                  on;'; \
    echo '    gzip_proxied          any;'; \
    echo '    gzip_http_version     1.0;'; \
    echo '    gzip_comp_level       5;'; \
    echo '    gzip_min_length       256;'; \
    echo '    gzip_vary             on;'; \
    echo '    gzip_buffers          16 8k;'; \
    echo '    gzip_types text/css   application/javascript text/json text/xml text/plain image/svg+xml;'; \
    echo '    root                  /usr/share/nginx/html;'; \
    echo '    location / {'; \
    echo '        index index.html;'; \
    echo '        try_files $uri $uri/ /index.html =404;'; \
    echo '        add_header Pragma "no-cache";'; \
    echo '        add_header Cache-Control "no-store, no-cache, must-revalidate";'; \
    echo '        expires                   off;'; \
    echo '        gzip_static               on;'; \
    echo '    }'; \
    echo '    location /api {'; \
    echo '      rewrite /api/(.*) /$1 break;'; \
    echo '      proxy_pass http://backend;'; \
    echo '    }'; \
    echo '    include /etc/nginx/extra-conf.d/*.conf;'; \
    echo '}'; \
    } > /etc/nginx/conf.d/default.conf

RUN { \
      echo 'fastcgi_buffers 16 16k; '; \
      echo 'fastcgi_buffer_size 32k;'; \
      echo 'proxy_buffer_size   128k;'; \
      echo 'proxy_buffers   4 256k;'; \
      echo 'proxy_busy_buffers_size   256k;'; \
    } > /etc/nginx/conf.d/buffers.conf

RUN { \
    echo '#!/bin/sh'; \
    echo 'export NGINX_MAX_BODY_SIZE=${NGINX_MAX_BODY_SIZE:-520m}'; \
    echo 'export NGINX_SENDFILE=${NGINX_SENDFILE:-off}'; \
    echo 'export NGINX_NODELAY=${NGINX_NODELAY:-off}'; \
    echo "exec nginx -g 'daemon off;'"; \
    } > /usr/bin/docker-entrypoint.sh

RUN chmod +x /usr/bin/docker-entrypoint.sh

COPY --from=build-stage /app/build /usr/share/nginx/html

ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 80
