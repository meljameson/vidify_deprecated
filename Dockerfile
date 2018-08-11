FROM node:10
WORKDIR /app
COPY package.json yarn.lock /app/
RUN npm install -g webpack webpack-dev-server yarn
RUN yarn
COPY . /app
CMD yarn start
EXPOSE 8080