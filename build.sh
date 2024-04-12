#!/bin/bash

# Install dependencies in the root directory
npm install


# Build the React app
cd ./src/ui
npm install
npm run build
