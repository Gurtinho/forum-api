FROM node:lts-alpine
RUN mkdir -p /usr/app
WORKDIR /usr/app

RUN if [ ! -d .docker/dbdata ]; then mkdir -p .docker/dbdata; fi && \
  chown -R node .docker/

RUN rm -rf ./node_modules
RUN rm -rf package.lock.json

COPY package.json ./
RUN npm install

COPY . .
EXPOSE 8888
EXPOSE 9229

CMD cls | clear & npm run dev --inspect-brk=0.0.0.0:9229