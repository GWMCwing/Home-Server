#!/bin/bash

for d in $PWD/src/client/react/*/ ; do
    [ -L "${d%/}" ] && continue
    echo "Adding node_module Symlink on $d"
    [ -L "${d}node_modules" ] && continue
    ln -s $PWD/node_modules "${d}node_modules"
done