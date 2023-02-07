#!/bin/bash

#? TODO run each build in a sub shell and return 1 if fail and pause

echo Creating Symlink to node_modules && \
sh $PWD/script/createSymlink.sh && echo Symlink Created
# 
cd $PWD/src/client/react
# build react app in each sub directory
for d in */ ; do
# skip if the sub directory is the template
    if [ "$d" = "template/" ]; then
        continue
    fi
    cd $d
    echo "Building React App in $d"
    npm --prefix $PWD run build
    cd ..
done
echo Build Complete 