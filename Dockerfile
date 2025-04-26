##################################
# 1) Build Stage
##################################
FROM node:lts-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build && yarn cache clean --all

##################################
# 2) Production Stage
##################################
FROM node:lts-alpine AS production
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production && yarn cache clean --all

CMD ["node", "dist/main.js"]
