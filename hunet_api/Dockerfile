FROM node:14.15.5-alpine3.13 as development
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
COPY . .
RUN yarn install
CMD ["yarn", "start:production"]
