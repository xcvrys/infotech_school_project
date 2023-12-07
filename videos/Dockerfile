FROM node:current-alpine3.15

WORKDIR /opt/api
EXPOSE 3000
COPY . .
RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN yarn
CMD ["yarn","start"]