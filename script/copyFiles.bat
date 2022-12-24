@ECHO off
set flag=/s/e/v/x/k/y/d/f
@REM Do NOT remove /f flag, it fixes false cyclic copy error for js part
ECHO Copying HTML/Pug Files to bin && ^
xcopy %flag% "%cd%/src/client/html" "%cd%/bin/client/html" && ^
ECHO Copying CSS Files to bin && ^
xcopy %flag% "%cd%/src/client/static/css" "%cd%/bin/client/static/css" && ^
ECHO Copying Non-compiled JS Files to bin && ^
xcopy %flag% "%cd%/src/client/static/javascript/*.js" "%cd%/bin/client/static/javascript"