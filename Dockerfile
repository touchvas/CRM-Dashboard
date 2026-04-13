# ---------- Build stage ----------
FROM node:20-alpine AS build

# Native build tools (required for gulp-sass, node-gyp deps)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy only dependency manifests first (cache-friendly)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project source
COPY . .

# Build static assets
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]