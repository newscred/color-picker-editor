#!/bin/bash
set -xe

npm install

if [ "$RUNNER" = "lite" ]
then
    npm run build
    npm run start
else
    npm run dev
fi
