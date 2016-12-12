#!/usr/bin/env bash
ENV=$1

# Deps
yarn
# Build
node scripts/index.js --env=$ENV
