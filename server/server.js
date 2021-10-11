const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello world")
})

const routes = require('./src/routes/routes');
app.use(routes)
// app.use(express.json());
// app.use(routes);
// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal server error"
//     res.status(err.statusCode).json({
//         message: err.message,
//     })
// })
app.listen(port, console.log(`Server listening on: ${port}`));

