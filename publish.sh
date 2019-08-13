#!/bin/sh

mkdir -p dist
ls -la
cp {package.json,yarn.lock,package-lock.json,README.md} dist/
npx babel src --out-dir dist --source-maps --copy-files
