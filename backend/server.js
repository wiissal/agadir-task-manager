const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');
const app = express();

app.use(cors())  //connect the backend with front end req
app.use(express.json()); //access to data and let express read json req coming

//auth/task routes
app.use('/api/auth', require('./routes/auth'));


