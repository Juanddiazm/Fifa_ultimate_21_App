FROM node:14.17.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 1337
COPY . .


CMD [ "npm", "run", "dev" ]