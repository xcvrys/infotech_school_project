FROM mongo:latest

WORKDIR /tmp
EXPOSE 27017

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD admin

COPY quizzes.json .
COPY videos.json .
COPY importData.sh /docker-entrypoint-initdb.d/