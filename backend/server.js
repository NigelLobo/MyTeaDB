// server.js
// this file will serve the Vue build to the client 
const express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const app = express();
app.use(serveStatic(__dirname + "/public/dist"));

const PORT = 8080;

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`))