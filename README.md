# Formula 1 - Test exercise project

This project is only for demonstration purposes only.

## Available Scripts

In the project directory, you can run:

### `docker-compose up`
Runs the docker composer and create environment with containers.
It compiles and builds both of backend and frontend applications.\
If you don't have Docker on your computer you can find installation instructions here: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

## Features
- Show F1 drivers with basic info and image from backend API endpoint
- Drivers can overtake each other by click to Overtake button, then store new result on backend

## Repos
Both of frontend and backend repository are able to function independently. 
In this case you can do the following steps:

<br>

## Backend API endpoints
**URL** : `/api/drivers/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

### Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "id":1,
    "code":"ALO",
    "firstname":"Fernando",
    "lastname":"Alonso",
    "country":"ES",
    "team":"Alpine",
    "imgUrl":"/static/alo.png",
    "place":19
}
```
<br>

**URL** : `/api/drivers/{driverId}/overtake`

**Example** : `/api/drivers/5/overtake`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

### Success Response

**Code** : `200 OK`

**Content examples**


```json
[{
    "id":1,
    "code":"ALO",
    "firstname":"Fernando",
    "lastname":"Alonso",
    "country":"ES",
    "team":"Alpine",
    "imgUrl":"/static/alo.png",
    "place":2
},
{
    "id":8,
    "code":"MAG",
    "firstname":"Kevin",
    "lastname":"Magnussen",
    "country":"DK",
    "team":"Haas F1 Team",
    "imgUrl":"/static/mag.png",
    "place":3
},
{
    "id":18,
    "code":"VER",
    "firstname":"Max",
    "lastname":"Verstappen",
    "country":"NL",
    "team":"Red Bull Racing",
    "imgUrl":"/static/ver.png",
    "place":17
},...]
```

## Backend repo scripts

### `npm install`
Install application dependencies. If you're using frontend repo independently you need to change API endpoints in `/src/services/driversData.tsx` and `/pages/mainPage/mainPage.tsx` before run build process. \
The reason of this change because Docker composer is set reverse proxy routes during composing process.

### `npm run build`
Builds the app for production to the `dist` folder.\
It correctly bundles App in production mode and optimizes the build for the best performance. Beside that copying static contents to dist folder.

### `npm start`
Runs the app in the production mode.

<br>

---

<br>

## Frontend repo scripts

### `npm install`
Install application dependencies.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React app in production mode and optimizes the build for the best performance.

### `npm start`
Runs the app in the development mode.\