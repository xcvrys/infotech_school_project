#!/bin/sh
sleep 5
mongoimport --db videosAppData --collection videos --authenticationDatabase admin --username admin --password admin --drop --jsonArray --file /tmp/videos.json
mongoimport --db videosAppData --collection quizzes --authenticationDatabase admin --username admin --password admin --drop --jsonArray --file /tmp/quizzes.json