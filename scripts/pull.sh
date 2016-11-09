#!/usr/bin/env bash

BRANCH=$1

git fetch --prune
git checkout $BRANCH
git pull
