#!/bin/bash

# Do NOT remove /f flag, it fixes false cyclic copy error for js part
echo Copying HTML/Pug Files to bin && \
cp -r --update "${PWD}/src/client/html" "${PWD}/bin/client/html" && \
echo Copying CSS Files to bin && \
cp -r --update "${PWD}/src/client/static/css" "${PWD}/bin/client/static/css" && \
echo Copying Non-compiled JS Files to bin && \
# cp -r --update "${PWD}/src/client/static/javascript/**/*.js" "${PWD}/bin/client/static/javascript"
cp -r --update $(find ${PWD}/src/client/static/javascript -name "*.js") "${PWD}/bin/client/static/javascript"