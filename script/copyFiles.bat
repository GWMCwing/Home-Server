@ECHO off
set flag=/s/e/v/x/k/y/d
ECHO Copying HTML/Pug files && ^
xcopy %flag% "%cd%/src/client/html" "%cd%/bin/client/html" && ^
ECHO Copying CSS files && ^
xcopy %flag% "%cd%/src/client/static/css" "%cd%/bin/client/static/css" && ^