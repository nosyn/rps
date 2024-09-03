#!/bin/bash
echo "Waiting for s3 localstack is ready" 

MAX_TRIES=5
CONTAINER_NAME=localstack_main
BUCKET_NAME=rps-bucket
ENDPOINT_URL=http://localhost:4566
CURRENT_DIR=$(pwd)
ROOT_DIR=$(dirname $CURRENT_DIR)
CORS_CONFIG_FILE=file://$ROOT_DIR/cors-config.json

is_local_stack_ready() {
  docker logs $CONTAINER_NAME | grep Ready. 
}

create_bucket() {
    awslocal() {
        aws --endpoint-url=$ENDPOINT_URL "$@"
    }
    awslocal s3api create-bucket --bucket $BUCKET_NAME > /dev/null 2>&1
    awslocal s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration $CORS_CONFIG_FILE
    echo "Bucket $BUCKET_NAME created"
}

wait_until_service_is_ready() {
  attempt=1
  while [ $attempt -le $MAX_TRIES ]; do
    if "$@"; then
      echo "$2 container is up!"
      create_bucket
      break
    fi
      echo "Waiting for $2 container... (attempt: $attempt)"
      attempt=$((attempt+1))
    sleep 5
  done

  if [ $attempt -gt $MAX_TRIES ]; then
    echo "Error: $2 not responding, cancelling set up"
    exit 1
  fi
}

wait_until_service_is_ready is_local_stack_ready $CONTAINER_NAME
