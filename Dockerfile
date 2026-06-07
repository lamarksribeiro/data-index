FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=3050
ENV NODE_ENV=production

EXPOSE 3050

CMD ["node", "index.js"]
