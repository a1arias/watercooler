Watercooler
===========
A watercooler app that displays quotes.

Built using Node.js, express, and socket.io. Quotes are broadcasted via socket.io to a JavaScript on the webpage so quotes are updated without refreshing.

Quotes can be generated from fortune. See the script in bin/fortune2mongo.

Getting Started
===============

1. Install dependencies

		npm install

2. Import quotes

		mongoimport -b <db> -c <collection> < fortune.quotes.mongoexport 

3. Run the app

		bin/server
