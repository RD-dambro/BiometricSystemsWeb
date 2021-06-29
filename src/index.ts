import "reflect-metadata";
import {createConnection} from "typeorm";

const express = require('express')
const bodyParser = require('body-parser');

const cors = require('cors')
const devices = require('./controller/devices')
const galleries = require('./controller/galleries')
const employees = require('./controller/employees')
const samples = require('./controller/samples')
const whitelists = require('./controller/whitelists')

const port = 3000

createConnection().then(async connection => {
    // here you can start to work with your entities
    console.log("connected")

    const app = express();
    app.use(cors())
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use('/devices', devices)
    app.use('/galleries', galleries)
    app.use('/employees', employees)
    app.use('/samples', samples)
    app.use('/whitelists', whitelists)
    
    app.listen(port, err => {
        if(err) console.error(err);
        else console.log(`Server started on port ${port}`);
    });
})
.catch(error => console.log(error));