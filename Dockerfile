# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Production Stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
CMD ["npm", "start"]
