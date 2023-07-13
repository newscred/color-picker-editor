ARG ECR_REGION

FROM 359067941545.dkr.ecr.${ECR_REGION}.amazonaws.com/node:18.16.0-slim

WORKDIR /code

RUN apt update -qq && apt install -y curl

COPY package*.json ./

RUN npm install

COPY . .
