#!/usr/bin/env bash

git checkout package-lock.json
git checkout master
git pull
npm i
npm run build
#set NAME
pm2 restart NAME
sudo systemctl reload nginx