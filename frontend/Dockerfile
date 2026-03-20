# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the frontend
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Start the frontend
CMD ["serve", "-s", "dist", "-l", "3000"]
