FROM node:18.17.0-alpine
RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY ${OPENAI_API_KEY}

RUN npm run build

CMD ["npm", "start"]
