FROM node:18.20.3-alpine AS builder
WORKDIR "/build"
COPY . .

ENV API_BASE_PATH=http://api.idxacademy.xyz/retail/

RUN npm ci; \
        npm run build; \
        npm prune --omit-dev

FROM nginx:1.27-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 8080

USER nginx

COPY --from=builder --chown=nginx:nginx /build/dist /etc/nginx/html