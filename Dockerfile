ARG PUBLIC_APP_URL

FROM node:18.17.0-alpine
RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm ci --omit=dev
RUN npm run build

CMD ["npm", "start"]