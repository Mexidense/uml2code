ARG PUBLIC_APP_URL

FROM node:18.17.0-alpine
RUN mkdir /app
COPY package.json /app/
WORKDIR /app

COPY . ./

ENV NEXT_PUBLIC_APP_URL ${PUBLIC_APP_URL}

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["npm", "run","start"]