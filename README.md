# React based Frontend Takehome

## Table of Contents

-   [Node Requirements](#node-prerequisites)
-   [Local Application Development](#local-application-development)
-   [Build the Application Locally](#build-the-application-locally)
-   [Running Locally](#running-locally)
-   [Unit Testing](#unit-testing)

# Node Prerequisites

Your local system will need to have the following installed:

1. [Node](https://nodejs.org/en/): The recommended version is [v16.13.1].
   <br>

    > This is the version that is used to build the deployed application and supports the testing suite. Lower versions may work, but anything below v16 will [likely cause problems](https://www.redhat.com/en/blog/nodejs-16-here-updated-platform-support-v8-version-9-and-more) due to features used in our tests.

2. [Node Package Manager (npm)](https://www.npmjs.com/), v6.14.13.
   <br>
    > Lower versions _may_ work, but [caveat emptor](https://en.wikipedia.org/wiki/Caveat_emptor).

## NVM

While not required, utilizing a Node Version Manager or NVM on your machine can prove incredibly useful, especially if you find yourself jumping from project to project with differing requirements. It allows you to swap versions of Node on the fly.

-   **Mac:** [Node Version Manager](https://github.com/nvm-sh/nvm)
-   **Windows:** [NVM for Windows](https://github.com/coreybutler/nvm-windows#installation--upgrades)
-   **Ubuntu:** [NVM for Ubuntu](https://github.com/nvm-sh/nvm#installing-nvm-on-alpine-linux)

# Local Application Development

The proven way to run the application locally is via dueling Node instances.
Here is the cliff notes on getting going quickly for operating locally...

## Build the Application Locally

1.  Clone the repo in order to pull down the source code
    `git clone https://github.com/oneway-fullstack/front-end_takehome`

2.  Navigate to project folder
    `cd front-end_takehome`

3.  Install npm dependencies
    `npm install`

4.  Build the application by running `npm run build`

## Running Locally

1. In a separate terminal, run the front end application
   `npm run start`
2. This should, eventually, open a browser window pointing to [http://localhost:3000)

Subsequent code changes should trigger a reload on the page, so manual and/or hard refreshing should only be minimally required.

# Unit Testing

To run all the tests asynchronously, from the terminal, run `npm run test`
