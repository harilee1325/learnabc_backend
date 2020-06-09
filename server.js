const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');


const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }))

const dbName = 'learnabc_db';

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    const db = database.db(dbName);
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log("We are live on " + port);
    })

})