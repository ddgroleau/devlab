FROM node:alpine AS dependencies
EXPOSE 80
EXPOSE 443

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM node:alpine AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ARG NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_API_URI=$NEXT_PUBLIC_API_URI
RUN npm install -g pnpm
RUN pnpm build

FROM node:alpine AS production
ARG X_TAG
WORKDIR /opt/app

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
CMD ["node_modules/.bin/next", "start"]