#!/usr/bin/env bash
ENV=$1

# Deps
yarn
# Build
node index.js --env=$ENV
