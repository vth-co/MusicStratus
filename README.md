# MusicStratus

MusicStratus is a clone of [SoundCloud](https://soundcloud.com/) where users can upload and share songs. Users can listen to these songs and comment on their enjoyment or whatever they want underneath the audio player.

## Live Site

A live deployment of [MusicStratus](https://musicstratus.onrender.com/) is hosted on Render.

## Screenshots 

### Welcome

![](https://i.gyazo.com/edec8076ae0513efe16c919f8298adfc.jpg)

### Discover

![](https://i.gyazo.com/42fb6a841e7e18a68e9b1cab158f30ce.jpg)

### Music Player

![](https://i.gyazo.com/2bd5ddffec5ca26022e2e317125ce070.png)

### Search

![](https://i.gyazo.com/48ff0cd9b234145f2178a4b11baf0fa5.png)

## Features

* Full CRUD Features for Songs
* Full CRUD Features for Comments
* Like/unlike any songs
* Music player throughout entire app
* Search for songs/artists
* Feed page updates with most recent posted songs
* Profile page with customizable profile picture
* Tracks liked songs, playlists, and uploaded songs


### Future Features
* Users can create playlists
* Users can create albums for better organization of songs
* Users can follow other artists for updates
* Users can reply to other comments

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
7. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL. Replace user and password with your own.
``` 
CREATE USER <user> WITH CREATEDB PASSWORD <'password'>
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
