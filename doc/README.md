# Home Server

[![commit-activity](https://img.shields.io/github/commit-activity/m/GWMCwing/Home-Server)](https://github.com/GWMCwing/Home-Server)
[![last-commit](https://img.shields.io/github/last-commit/GWMCwing/Home-Server)](https://github.com/GWMCwing/Home-Server)
[![license](https://img.shields.io/github/license/GWMCwing/Home-Server)](https://github.com/GWMCwing/Home-Server/blob/master/LICENSE)
[![website-status](https://img.shields.io/website?up_message=online&url=https%3A%2F%2Fgwmc.duckdns.org)](https://gwmc.duckdns.org)

A repo for my web server. This is a work in progress. This repo is used for learning and experimentation on backend development, front end development on basic css and html structuring. 

Future updates may include

1. Docker image
2. React front end

## Installation

This Web Server is designed to be run on nodejs 16 with mongodb 6.0.3. Docker image will be created in the future.

1. Clone or fork this repo and run `npm install` to install all dependencies.
2. Setup Environment Variables
   - If you are running in a development environment, create a `.env` file in the root directory and add the environment variables stated in the [required.md](./required.md) file.
   - If you are running in a production environment, follow the instructions in the [required.md](./required.md) file.
   - Do **NOT** add any environment variables in `.env` when running as a production environment. (Future update will remove the import on `.env` during production.)
3. Run `npm run build_linux` to build the project. / `npm run build` to build the project for windows.
4. Run `npm run startOnly` to start the server.

## Required Configuration

See [required.md](./required.md) for required configuration.

## Notes

- When running in development mode, the template will be compiled via the `src/` path, while in production mode, the template will be compiled via the `bin/` path.
