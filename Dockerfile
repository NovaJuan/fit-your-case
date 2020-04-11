FROM node:12.7.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run build:assets

EXPOSE 5000

CMD [ "npm", "start" ]