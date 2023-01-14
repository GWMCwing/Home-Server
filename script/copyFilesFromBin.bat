@ECHO off
set flag=/s/e/v/x/k/y/d/f
@REM Do NOT remove /f flag, it fixes false cyclic copy error for js part
ECHO Copying HTML/Pug Files to src && ^
xcopy %flag% "%cd%/bin/client/html" "%cd%/src/client/html" && ^
ECHO Copying CSS Files to src && ^
xcopy %flag% "%cd%/bin/client/static/css" "%cd%/src/client/static/css"