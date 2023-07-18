# syntax=docker/dockerfile:1

# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

# Install both production and development dependencies
RUN yarn install

COPY . .

# Use the example config.json for building
COPY ["config.example.json", "./src/config.json"]

# Build the TypeScript app
RUN yarn build

# Stage 2: Production
FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app

# Copy from the builder stage the installed dependencies and the built app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

CMD ["node", "dist/index.js"]
