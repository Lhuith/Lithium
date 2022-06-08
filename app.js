const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const livereload = require("livereload")
const connectLiveReload = require("connect-livereload")


app.use(connectLiveReload())

// crud data loaders
// Add headers before the routes are defined
// credit, jvandemo : https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
})

app.use(bodyParser.json())

require('./custom_modules/core/meta/IO/routes/data.routes.js')(app)

app.use(express.static(__dirname+ '/public'))
app.use('/build', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

//!---------------------- custom modules ----------------------!//
app.use('/public/', express.static(path.join(__dirname, 'public/')))
app.use('/meta/', express.static(path.join(__dirname, 'meta')))
app.use('/core/', express.static(path.join(__dirname, 'custom_modules/core')))
app.use('/nomads/', express.static(path.join(__dirname, 'custom_modules/nomads')))
app.use('/nomads/components', express.static(path.join(__dirname, 'custom_modules/nomads/components'))) 
app.use('/core/physics/', express.static(path.join(__dirname, 'custom_modules/core/physics')))
app.use('/core/input/', express.static(path.join(__dirname, 'custom_modules/core/input')))
app.use('/core/math/', express.static(path.join(__dirname, 'custom_modules/core/math')))
app.use('/core/data/', express.static(path.join(__dirname, 'custom_modules/core/data')))
app.use('/core/geometry/', express.static(path.join(__dirname, 'custom_modules/core/geometry')))
app.use('/core/data/instance_geometry', express.static(path.join(__dirname, 'custom_modules/core/data/instance_geometry')))
//!---------------------- custom modules ----------------------!//

const directory = path.join(__dirname)
const publicDirectory = path.join(__dirname+ '/public')
var liveReloadServer = livereload.createServer()

liveReloadServer.watch(directory)
liveReloadServer.watch(publicDirectory)

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/")
    }, 100)
})

app.listen(3000, function() {
    console.log('Visit http://localhost:3000')
})
