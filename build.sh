#!/bin/sh

mkdir -p dist
cp ./package.json ./dist/
cp ./yarn.lock ./dist/
cp ./package-lock.json ./dist/
cp ./README.md ./dist/
./node_modules/.bin/babel src --out-dir dist --source-maps --copy-files
