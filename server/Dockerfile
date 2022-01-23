FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 2568

CMD [ "node", "src/index.js" ]