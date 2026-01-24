FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# BrowserSync port
EXPOSE 3000

# Run gulp via npm script
CMD ["npm", "run", "dev"]
