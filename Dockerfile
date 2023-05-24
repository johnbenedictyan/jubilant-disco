FROM node:latest

WORKDIR /app

COPY ./package.json .
RUN yarn cache clean --force
RUN yarn install
RUN yarn build
COPY . .

EXPOSE 3000

# CMD yarn start
CMD [ "yarn", "start" ]