### STAGE 1: Build ###
FROM node:12.20.1-alpine3.12 as build

#RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build
EXPOSE 4000
ENV PORT 4000
CMD npm start
# CMD ["node", "server.js"]