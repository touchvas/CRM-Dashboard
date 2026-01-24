FROM node:20-alpine

# Install git (and build tools if needed)
RUN apk add --no-cache git python3 make g++

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Expose and run your app
EXPOSE 3000
CMD ["npm", "run", "dev"]
