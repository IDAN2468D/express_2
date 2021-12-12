const express = require("express");
const path = require("path");
const http = require("http");
var cors = require('cors')



const dbConnect = require("./db/mongoConnect");
const { routesInit } = require("./routes/config_route");

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);


const server = http.createServer(app);

const port = "3002";
server.listen(port);

app.listen(port, "192.168.1.181", function () {
    console.log("raning" + port)
})