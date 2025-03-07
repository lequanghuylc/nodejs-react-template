## Intro
Traditional Nodejs & React template: a quick demonstration how the parts are connected to each other in one single container.

## What does traditional mean
It means "not severless". You dont have to worry about Database connection pool, or api timeout or cron jobs.

## Folder structure
- `backend`: NodeJS: Express with Postgres
- `frontend`: React (Vite)

## How to develop
- check .nvmrc to install correct nodejs version
- `cp .env_clone_me .env` (repeat in each folder you see `.env_clone_me` file)
- backend: `cd backend`
  - start local db using: `yarn run-local-db` (docker && docker-compose required)
  - `yarn`
  - `yarn dev`
- frontend: `cd frontend`
  - `yarn`
  - `yanr dev`

## How to deploy

This sample is compatible with [c9sdk-pm2-nginx](https://github.com/lequanghuylc/c9sdk-pm2-nginx). It can be deployed in single container with **IDE** & **auto deployment** integrated

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/EjubUu?referralCode=kmHOLH)

## How to scale

This repo can help you start quickly, and if the word `single container` scares you, please check [Railway docs](https://docs.railway.com/reference/scaling) about scaling. Basically it will automatically do Vertical Autoscaling, and if that is not enough, you can go further with Horizontal Scaling with Replicas.

This codebase is built with intention to be used in Railway.app platform (but it can be deployed anywhere with custom deployment config).