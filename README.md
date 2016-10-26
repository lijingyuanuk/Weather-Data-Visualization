CS5003_Project3 Data Mashups

Running method:

cd A3withDatabaseAndNode

Running on your own machine:
1) First you have to npm install the modules
2) Start CouchDB
3) When you start the project for the first time, in the project dir run node initServer.js
4) Start the actual app with npm start in the project dir, or node www/bin  


Running on the university's server:
1) Put the project into your nginx folder
2) in the terminal do couchdb-setup then couchdb-start
3) Get your username, password, port and pc number from what is displayed
4) Edit the following files: app.js, database.js and initServer.js by replacing the line
var nano = require('nano')('http://localhost:5984');
with
var nano = require('nano')('http://<username>:<password>@<pc>-l.cs.st-andrews.ac.uk:<port>');
For example:
var nano = require('nano')('http://kmg23:R7LRp4Rp@pc2-034-l.cs.st-andrews.ac.uk:20262');
5) In the project directory run npm install
6) run node initServer.js
7)when it's done terminate it (ctrl + c)
8) in the app.js file delete the line app.set('port', process.env.PORT || 3000);
9) in the same file add a line app.listen(8080); just above the last line (which says module.exports...)
8)run npm start in the terminal
9)go to http://127.0.0.1:8080/ and it should work

*Tips: nodemon can reflash your changes of this project automatically:  
1) install nodemon: npm install -g nodemon
2) start project: nodemon ./bin/www