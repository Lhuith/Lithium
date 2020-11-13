const express = require('express')
const app = express()
const path = require('path')
const livereload = require("livereload")
const connectLiveReload = require("connect-livereload");

app.use(connectLiveReload());

app.use(express.static(__dirname+ '/public'))

app.use('/build', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))
app.use('/utils/', express.static(path.join(__dirname, 'custom_modules/utils')))
app.use('/nomads/', express.static(path.join(__dirname, 'custom_modules/nomads')))
app.use('/core/physics/', express.static(path.join(__dirname, 'custom_modules/core/physics')))
app.use('/core/input/', express.static(path.join(__dirname, 'custom_modules/core/input')))

const publicDirectory = path.join(__dirname+ '/public')
var liveReloadServer = livereload.createServer()
liveReloadServer.watch(publicDirectory);

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.listen(3000, function() {
    console.log('Visit http://127.0.0.1:3000')
})