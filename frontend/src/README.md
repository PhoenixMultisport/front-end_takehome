# Frontend Assessment

## Table of contents
- [Overview](#overview)
- [Start up](#start-up)
- [Available Scripts](#available-scripts)
- [Testing](#testing)

## Overview

This project is written in Typescript from the create-react-app boilerplate.

## Start up

### `docker build . -t dockerized-frontend`

Build the Docker image for the current folder and tag it with a name.

### `docker images | grep dockerized-frontend`

Check image was created.

### `docker run -p 3000:80 -d dockerized-frontend`

Open [http://localhost:3000](http://localhost:3000) to view.

## Available Scripts

These are vanilla react script to run the project locally.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Testing

### `npm test`

Launches the test runner utilizing [Jest](https://jestjs.io).

- Currently, checking successful rendering and snapshots of all components
