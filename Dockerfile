# ---------- Build stage ----------
FROM node:22-alpine AS build

# Native build tools (required for gulp-sass/node-gyp) + dumb-init
RUN apk add --no-cache python3 make g++ git

WORKDIR /app

# Credentials for private NPM registry
ARG NPM_USERNAME
ARG NPM_PASSWORD
ARG NPM_EMAIL

# Copy only dependency manifests first (cache-friendly)
COPY package*.json ./

# Configure private registry and install dependencies
RUN echo "registry=https://registry.touchvas.work/repository/npm-group/" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-group/:username=${NPM_USERNAME}" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-group/:_password=${NPM_PASSWORD}" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-group/:email=${NPM_EMAIL}" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-group/:always-auth=true" >> ~/.npmrc && \
    echo "@touchvaske:registry=https://registry.touchvas.work/repository/npm-hosted/" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-hosted/:username=${NPM_USERNAME}" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-hosted/:_password=${NPM_PASSWORD}" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-hosted/:email=${NPM_EMAIL}" >> ~/.npmrc && \
    echo "//registry.touchvas.work/repository/npm-hosted/:always-auth=true" >> ~/.npmrc && \
    npm install --network-timeout=100000 --fetch-retries=5 --fetch-retry-mintimeout=20000 && \
    rm ~/.npmrc



# Build static assets
ARG BUILD_VERSION
ENV BUILD_VERSION=$BUILD_VERSION

# Copy project source
COPY . .

#build static assets
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:alpine

# Install dumb-init and curl for healthchecks
RUN apk add --no-cache dumb-init curl

# Custom nginx config (removes default via COPY)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]