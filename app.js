
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs({ extname: '.hbs' })); 
app.set('view engine', 'hbs');

/*
connection pool is a cache of database connections maintained so that the connections
can be reused when future requests to the database are required.
*/
const pool  = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME
});
  
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected!
    console.log('connected as id ' + connection.threadId)
});

// Routes
const routes = require('./server/routes/user');
app.use('/', routes);

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));