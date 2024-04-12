#!/bin/bash

# Install dependencies in the root directory
npm install

# Install dependencies in the 'ui' folder
cd ./scr/ui
npm install

# Build the React app
cd ./src/ui
npm run build