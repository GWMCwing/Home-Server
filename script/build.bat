@ECHO off
@REM Compile client side before compiling server side to prevent server side compiling into module
ECHO Compiling Client side Typescript && ^
npx tsc --project tsconfig.client.json && ECHO Compile Complete && ^
ECHO Compiling Server side Typescript && ^
npx tsc --project tsconfig.server.json && ECHO Compile Complete