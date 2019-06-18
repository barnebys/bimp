FROM mhart/alpine-node:11 as base
RUN apk add --update \
    python \
    vips-dev \
    fftw-dev \
    gcc g++ make libc6-compat \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/main/ \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/community/ \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ \
  && rm -rf /var/cache/apk/*
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn --production
COPY . .

FROM mhart/alpine-node:11
RUN apk upgrade --update-cache --available \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/main/
RUN apk add --update \
    vips-dev \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/main/ \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/community/ \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ \
  && rm -rf /var/cache/apk/*

WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
CMD ["node", "./node_modules/.bin/micro"]

EXPOSE 3000
