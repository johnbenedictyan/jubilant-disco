FROM node:lts-alpine
WORKDIR /usr/app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn run build
CMD ['yarn', 'run', 'start']