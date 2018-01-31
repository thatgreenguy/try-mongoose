#!/bin/bash

# Start up a docker mongodb instance for testing
# Note: database data persists to ~/Projects/dbdata/try-mongoose
#
# Default port : 27017
#
#  --volume /docker-data/rabbitmq/data:/var/lib/rabbitmq \

docker stop db-mongo
docker rm db-mongo
docker run -d --name db-mongo \
    -p 27017:27017 \
    -v ~/Projects/dbdata/try-mongo:/data/db \
    --restart=always \
    mvertes/alpine-mongo

