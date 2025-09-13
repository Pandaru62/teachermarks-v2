# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Keep only build-time args you actually need (Vite envs are baked at build time)
ARG VITE_API_KEY_MAPBOX
ENV VITE_API_KEY_MAPBOX=${VITE_API_KEY_MAPBOX}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built app into nginx default html root
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
