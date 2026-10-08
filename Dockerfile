# Stage 1: Build Frontend (Vite + React)
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Production Server Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Copy server package definitions and install production packages
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Copy server source code
COPY server/ ./server/

# Copy compiled frontend build from client-builder
COPY --from=client-builder /app/client/dist ./client/dist

# Expose application port
EXPOSE 5001

# Start the unified full-stack server
CMD ["node", "server/server.js"]
