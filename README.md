# MusicStratus

MusicStratus is a clone of [SoundCloud](https://soundcloud.com/) where users can upload and share songs. Users can listen to these songs and comment on their enjoyment or whatever they want underneath the audio player.

## Live Site

A live deployment of [MusicStratus]([https://musicstratus.onrender.com/]) is hosted on Render.

## Screenshots 

### Welcome

![](https://i.gyazo.com/927fb757907d9dfd22aa31e265dad0cd.png)

### Discover

![](https://i.gyazo.com/fadb84efe6fa918394d085aff4195d22.png)

### Music Player

![](https://i.gyazo.com/8692ad8abbba64222a00621c782d332d.png)

### Search

![](https://i.gyazo.com/ffe5bce688cff60c44701b6324886d8a.png)

## Features

* Full CRUD Features for Songs
* Full CRUF Features for Comments
* Music player throughout entire app
* Search for songs/artists

### Future Features
* Users can like songs
* Users can create playlists
* Users can create albums for better organization of songs
* Users can follow other artists for updates

## Technologies Used
* Javascript
* React
* Redux
* Render
* PostgreSQL

## Local Installation
1. Clone this repo
```
https://github.com/vth-co/MusicStratus.git
```
2. CD into the backend directory and install dependencies
```
npm install
```
3. CD into the frontend directory and install dependencies
```
npm install
```
4. Create .env file in the backend directory based on the .env.example found in the backend directory
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for you JWT_SECRET, and your desired PORT
6. Add the following proxy to your frontend package.json file, replacing portNumber with the port you specified in your .env file
```
"proxy": "http://localhost:portNumber
```
7. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
``` 
CREATE USER WITH CREATEDB PASSWORD <'password'>
```
8. Create Database, Migrate, and Seed models.
```
npx dotenv sequelize db:create

npx dotenv sequelize db:migrate

npx dotenv sequelize db:seed:all
```
9. Start the backend server by running npm start inside your backend directory in the terminal
```
npm start
```
10. Start the frontend server by running npm start inside your frontend directory in the terminal
```
npm start
```
11. For the audio player, run:
```
npm i react-h5-audio-player
```
12. Please use the Demo user or create an account to begin using MusicStratus!
