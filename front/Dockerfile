FROM node:14.17.3

RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install --legacy-peer-deps
EXPOSE 3000
COPY . .


CMD [ "npm", "run", "start" ]