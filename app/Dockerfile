FROM node:17 as build-stage



WORKDIR /app

COPY . .

RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN npm run build



FROM nginx:1.16-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html