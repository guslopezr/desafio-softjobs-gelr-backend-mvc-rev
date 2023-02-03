const express = require('express');
const cors = require('cors')
const app = express();
const indexRoutes = require('./src/routes/indexRoutes')
require('dotenv').config()
const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/', indexRoutes)

app.listen(PORT, console.log("Puerto levantado"));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://softjobs-gelr.netlify.app');
    next();
});