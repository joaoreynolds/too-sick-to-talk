const https = require('https')
const fs = require('fs')
const express = require('express')
const env = process.env

var app = express()

/*
Trust proxy in case needed for server like heroku, etc...
 */
app.set('trust proxy', true)

app.set('x-powered-by', false)

/**
 * IMPORTANT: Application HAS to respond to GET /health with status 200
 * for OpenShift health monitoring
 */
app.use('/health', (req, res) => {
  res.status(200).send('Server is running and healthy.');
})

/*
Serve static assets
 */
app.use('/static', express.static('dist/static', {index: false}))
//if this route catches, then the asset could not be found
app.use('/static/*', (req, res) => {
  res.status(404).send('We cannot find what you are looking for.')
})

/*
Send request to the app, let it deal with 404s, etc
 */
app.use((req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

/*
Startup app
 */
app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
 console.log(`Application worker ${process.pid} started...`)
})
