#!/bin/bash

echo Creating Symlink to node_modules && \
sh $PWD/script/createSymlink.sh && echo Symlink Created \
echo Building React App && \
npm run buildReact_linux && echo Build Complete \
echo Compiling Client side Typescript && \
npx tsc --project tsconfig.client.json && echo Compile Complete \
echo Compiling Server side Typescript && \
npx tsc --project tsconfig.server.json && echo Compile Complete \
echo Copying Client side files && \
npm run copyFiles_linux && echo Copy Complete