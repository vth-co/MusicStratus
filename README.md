1. Clone this repo
* git clone git@github.com:vth-co/MusicStratus.git
2. Install dependencies from the roto directory.
* npm install
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
* CREATE USER <name> WITH CREATEDB PASSWORD <'password'>
4. Create .env file in the backend directory based on the .env.example found in the backend directory
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for you JWT_SECRET, and your desired PORT
6. Add the following proxy to your frontend package.json file, replacing portNumber with the port you specified in your .env file

* "proxy": "http://localhost:portNumber
7. Create Database, Migrate, and Seed models.

* npx dotenv sequelize db:create
* npx dotenv sequelize db:migrate
* npx dotenv sequelize db:seed:all

8. Start the backend server by running npm start inside your backend directory in the terminal
* npm start

9. Start the frontend server by running npm start inside your frontend directory in the terminal
* npm start

10. For the audio player, run:
* npm i react-h5-audio-player 

You can use the Demo user or create an account to begin using MusicStratus
