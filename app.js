/* 
const express = require('express')
const cors = require('cors')
const app = express()
const indexRoutes = require('./src/routes/indexRoutes')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/', indexRoutes)
app.listen(PORT, console.log(`SERVER ON PORT: ${PORT}`)) */

///

const express = require('express');
const cors = require('cors')
const app = express();
const indexRoutes = require('./src/routes/indexRoutes')
const port = process.env.PORT || 6787;

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/', indexRoutes)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});