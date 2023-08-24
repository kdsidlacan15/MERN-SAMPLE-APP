# MERN-sample-workout-app

This is a sample **MERN CRUD** app inspired by [Net Ninja's Youtube Channel](https://www.youtube.com/@NetNinja)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)

## About

A Simple workout tracker app good for learning using the MERN stack for beginners.

## Features

- With Authenticaiton using **JWT**
- **Bcrypt** for Encryption
- React's **useReducer** for handling simple state
- MongoDB Atlas for DB.
  To Learn more about MongoDB Atlas please see [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)

## Running in your local Machine

Clone Repository and enter the root folder.

```bash
$ git clone https://github.com/kdsidlacan15/mern-sample-app.git
$ cd mern-sample-app
```

From root folder Install Server packages and Run Server

### Note:

To be able to run backend server, you must create your own .env variables. Keys for env variables needed are saved in **env-sample.txt** file inside the backend folder.

```bash
$ cd backend
$ npm install
$ npm run dev
```

**Example:**

```bash
MONGO_URI=<Your MongoDB Connection String>
PORT=4000
SECRET=<Your Secret>
```

From root folder Install React packages and Run

```bash
$ cd frontend
$ npm install
$ npm start
```

You can Acess the app by going to [localhost:3000](http://localhost:3000)

## Running With Docker

**Clone Repository**

```bash
$ git clone https://github.com/kdsidlacan15/mern-sample-app.git
$ cd mern-sample-app
```

**Pull Backend Image**

```bash
$ docker pull kdsidlacan/workout-app-api:latest
```

**Pull Frontend Image**

```bash
$ docker pull kdsidlacan/workout-app-frontend:latest
```

**Create .ENV file**

If we are running the app with docker we don't need to create our own mongoDB conection string since it will be connecting through the docker mongo db instance (refer to docker-compose.yaml)

We only need to Create .env file in the root folder for PORT and SECRET

```bash
PORT=4000
SECRET=<Your JWT Secret for auth>
```

**Start Application in docker detached mode**

```bash
$ docker-compose up -d
```

You can Acess the app by going to [localhost:3000](http://localhost:3000)
