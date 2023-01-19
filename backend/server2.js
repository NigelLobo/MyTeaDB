// server.js
const express = require('express');
var path = require('path');
var serveStatic = require('serve-static');       
const app = express();
app.use(serveStatic(__dirname + "/public/dist"));

//
const PORT = 8080;
//
//app.get('/',(req, res) => res.send('Hello World'));
//
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`))