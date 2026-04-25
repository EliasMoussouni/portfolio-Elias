# syntax=docker/dockerfile:1.7

# ============================================================
# Stage 1 — Build (CRA / react-scripts)
# ============================================================
FROM node:20.11-alpine AS builder

WORKDIR /app

ENV CI=true \
    GENERATE_SOURCEMAP=false

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY public ./public
COPY src ./src
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

RUN npm run build

# ============================================================
# Stage 2 — Runtime (nginx hardened, non-root)
# ============================================================
FROM nginx:1.27-alpine AS runtime

ENV NGINX_USER=nginx

# Tini for proper signal handling + curl for HEALTHCHECK
RUN apk add --no-cache tini curl && \
    rm -rf /usr/share/nginx/html/*

COPY --from=builder --chown=${NGINX_USER}:${NGINX_USER} /app/build /usr/share/nginx/html
COPY --chown=${NGINX_USER}:${NGINX_USER} nginx.conf /etc/nginx/conf.d/default.conf

# Allow nginx to run as non-root on port 8080
RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i -E 's|^pid\s+.*;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf && \
    sed -i '/^user\s*nginx;/d' /etc/nginx/nginx.conf && \
    chown -R ${NGINX_USER}:${NGINX_USER} /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html

USER ${NGINX_USER}

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -fsS http://localhost:8080/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nginx", "-g", "daemon off;"]
