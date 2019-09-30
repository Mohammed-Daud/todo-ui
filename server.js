const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080

app.use('/', serveStatic(path.join(__dirname, '/dist')));
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`todo app listening on port ${port}!`))