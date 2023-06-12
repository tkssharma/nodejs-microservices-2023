FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

COPY src ./src

RUN npm install

EXPOSE 3000


COPY client ./trpc-client

RUN npm install --prefix client


RUN npm run build:all

CMD ["npm", "start"]