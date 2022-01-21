FROM node:latest as build-stage



WORKDIR /app

COPY . .

RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN npm run build



FROM nginx
COPY --from=build-stage /app/build /usr/share/nginx/html