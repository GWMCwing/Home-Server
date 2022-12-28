@ECHO off
ECHO Compiling Server side Typescript && ^
npx tsc --project tsconfig.server.json && ECHO Compile Complete && ^
ECHO Compiling Client side Typescript && ^
npx tsc --project tsconfig.client.json && ECHO Compile Complete