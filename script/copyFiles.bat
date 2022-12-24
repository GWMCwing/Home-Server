@ECHO off
set flag=/s/e/v/x/k/y/d/f
@REM Do NOT remove /f flag, it fixes false cyclic copy error for js part
ECHO Copying HTML/Pug files && ^
xcopy %flag% "%cd%/src/client/html" "%cd%/bin/client/html" && ^
ECHO Copying CSS files && ^
xcopy %flag% "%cd%/src/client/static/css" "%cd%/bin/client/static/css" && ^
ECHO Copying Non-compiled JS files && ^
xcopy %flag% "%cd%/src/client/static/javascript/*.js" "%cd%/bin/client/static/javascript"