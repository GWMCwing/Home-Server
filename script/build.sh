#!/bin/bash

echo Compiling Client side Typescript && \
npx tsc --project tsconfig.client.json && echo Compile Complete \
echo Compiling Server side Typescript && \
npx tsc --project tsconfig.server.json && echo Compile Complete