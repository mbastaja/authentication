const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../server/src/middleware/error-handler');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello world")
})

const routes = require('./src/routes/routes');
app.use(routes)

app.use(errorHandler);

app.listen(port, console.log(`Server listening on: ${port}`));

